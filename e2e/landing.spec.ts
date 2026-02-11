import { test, expect } from '@playwright/test';

test('loads landing page and core sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);

  // Assert main heading
  await expect(
    page.getByRole('heading', { name: /your docs, deployed in seconds/i })
  ).toBeVisible();

  // Assert key sections/content
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();

  // Assert key subheadings by section
  await expect(
    page.getByRole('heading', { name: /everything you need to ship docs/i })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /from chaos to deployed in 3 steps/i })
  ).toBeVisible();
});
