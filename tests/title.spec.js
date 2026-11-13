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

test('title shows the count and follows the tick', async ({ page }) => {
  await open(page);
  await expect(page).toHaveTitle('0 · Pulse');
  await page.clock.runFor(3000);
  await expect(page).toHaveTitle('3 · Pulse');
});

test('title shows Paused while paused and resumes counting', async ({
  page,
}) => {
  await open(page);
  await page.clock.runFor(3000);
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page).toHaveTitle('Paused · 3 · Pulse');
  await page.clock.runFor(5000);
  await expect(page).toHaveTitle('Paused · 3 · Pulse');
  await page.getByRole('button', { name: 'Resume' }).click();
  await expect(page).toHaveTitle('3 · Pulse');
  await page.clock.runFor(2000);
  await expect(page).toHaveTitle('5 · Pulse');
});

test('paused state restored from storage shows Paused in the title', async ({
  page,
}) => {
  await open(page, JSON.stringify({ count: 7, paused: true }));
  await expect(page).toHaveTitle('Paused · 7 · Pulse');
});

test('paused title survives a reload', async ({ page }) => {
  await open(page);
  await page.clock.runFor(2000);
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.reload();
  await expect(page).toHaveTitle('Paused · 2 · Pulse');
});
