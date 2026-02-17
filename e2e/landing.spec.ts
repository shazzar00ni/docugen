import { test, expect } from '@playwright/test';

test('loads landing page and core sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);

  // Verify key page sections are visible
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();

  // Verify key content
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
