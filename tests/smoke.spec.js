import { test, expect } from '@playwright/test';

test('page loads without errors', async ({ page }) => {
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => pageErrors.push(e.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/Pulse$/);
  await expect(page.locator('h1')).toBeAttached();
  await expect(page.locator('h1')).toHaveText('Pulse');
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
