import { test, expect } from '@playwright/test';

const KEY = 'pulse:state';

async function open(page, stored) {
  await page.clock.install({ time: 0 });
  if (stored !== undefined) {
    await page.addInitScript(
      ([k, v]) => {
        if (!sessionStorage.getItem('seeded')) {
          localStorage.setItem(k, v);
          sessionStorage.setItem('seeded', '1');
        }
      },
      [KEY, stored],
    );
  }
  await page.goto('/');
}

const count = (page) => page.getByTestId('count');

test('ticks once per second and jumps after a throttled gap', async ({
  page,
}) => {
  await open(page);
  await expect(count(page)).toHaveText('0');
  await page.clock.runFor(1000);
  await expect(count(page)).toHaveText('1');
  await page.clock.fastForward(10000);
  await page.clock.runFor(300);
  await expect(count(page)).toHaveText('11');
});

test('pause freezes, resume continues', async ({ page }) => {
  await open(page);
  await page.clock.runFor(3000);
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.clock.runFor(5000);
  await expect(count(page)).toHaveText('3');
  await page.getByRole('button', { name: 'Resume' }).click();
  await page.clock.runFor(2000);
  await expect(count(page)).toHaveText('5');
});

test('persists across reload, including paused state', async ({ page }) => {
  await open(page);
  await page.clock.runFor(4000);
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.reload();
  await expect(count(page)).toHaveText('4');
  await expect(page.getByRole('button', { name: 'Resume' })).toBeVisible();
});

test('persists a running count across reload and keeps counting', async ({
  page,
}) => {
  await open(page);
  await page.clock.runFor(4000);
  await page.reload();
  await expect(count(page)).toHaveText('4');
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
  await page.clock.runFor(1000);
  await expect(count(page)).toHaveText('5');
});

for (const bad of [
  '{"count":1e21,"paused":false}',
  'not json',
  '{"count":-1,"paused":false}',
  '{"count":1.5,"paused":false}',
  '{"count":3}',
  'null',
]) {
  test(`corrupt storage ${bad} falls back to 0`, async ({ page }) => {
    await open(page, bad);
    await expect(count(page)).toHaveText('0');
    await page.clock.runFor(1000);
    await expect(count(page)).toHaveText('1');
  });
}

test('throwing localStorage falls back without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      get() {
        throw new Error('denied');
      },
    });
  });
  await page.clock.install({ time: 0 });
  await page.goto('/');
  await page.clock.runFor(2000);
  await expect(count(page)).toHaveText('2');
  await page.getByRole('button', { name: 'Pause' }).click();
  expect(errors).toEqual([]);
});

test('keyboard toggles and focus is visible', async ({ page }) => {
  await open(page);
  await page.keyboard.press('Tab');
  await expect(page.locator('#toggle')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#toggle')).toHaveText('Resume');
  await page.keyboard.press('Space');
  await expect(page.locator('#toggle')).toHaveText('Pause');
});

test('reduced motion disables the animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page);
  await expect(count(page)).toHaveCSS('animation-name', 'none');
});

test('animates by default and tabular numerals are used', async ({ page }) => {
  await open(page);
  await expect(count(page)).toHaveCSS('animation-name', 'pulse');
  await expect(count(page)).toHaveCSS('font-variant-numeric', 'tabular-nums');
  await expect(page.locator('[aria-live]')).toHaveCount(0);
});

test('reset zeroes a running count and keeps counting', async ({ page }) => {
  const dialogs = [];
  page.on('dialog', (d) => dialogs.push(d.type()));
  await open(page);
  await page.clock.runFor(5000);
  await page.locator('#reset').click();
  await expect(count(page)).toHaveText('0');
  await page.clock.runFor(3000);
  await expect(count(page)).toHaveText('3');
  await expect(page.locator('#toggle')).toHaveText('Pause');
  await expect(count(page)).toHaveClass(/pulsing/);
  expect(dialogs).toEqual([]);
});

test('reset while paused stays paused and persists 0', async ({ page }) => {
  await open(page);
  await page.clock.runFor(4000);
  await page.locator('#toggle').click();
  await page.locator('#reset').click();
  await expect(count(page)).toHaveText('0');
  await page.clock.runFor(5000);
  await expect(count(page)).toHaveText('0');
  await expect(page.locator('#toggle')).toHaveText('Resume');
  const stored = await page.evaluate(
    (k) => globalThis.localStorage.getItem(k),
    KEY,
  );
  expect(JSON.parse(stored)).toEqual({ count: 0, paused: true });
  await page.reload();
  await expect(count(page)).toHaveText('0');
  await expect(page.locator('#toggle')).toHaveText('Resume');
});

test('reset persists 0 while running and when 0 was already shown', async ({
  page,
}) => {
  await open(page);
  await page.clock.runFor(500);
  await page.locator('#reset').click();
  await page.reload();
  await expect(count(page)).toHaveText('0');
  await expect(page.locator('#toggle')).toHaveText('Pause');
});

test('keyboard reaches reset after toggle', async ({ page }) => {
  await open(page);
  await page.clock.runFor(2000);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator('#reset')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(count(page)).toHaveText('0');
});

test('reset is visible within 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await open(page);
  await expect(page.locator('#reset')).toBeInViewport({ ratio: 1 });
});

for (const width of [320, 768, 1440]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await open(page);
    await page.clock.runFor(123000);
    const overflow = await page.evaluate(
      () =>
        globalThis.document.documentElement.scrollWidth >
        globalThis.document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
}

for (const scheme of ['light', 'dark']) {
  test(`renders in ${scheme} scheme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await open(page);
    const bg = await page.evaluate(
      () =>
        globalThis.getComputedStyle(globalThis.document.body).backgroundColor,
    );
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(page.locator('#toggle')).toBeVisible();
    await expect(page.locator('#reset')).toBeVisible();
  });
}
