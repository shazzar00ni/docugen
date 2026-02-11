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

test('navigate via anchor links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /features/i }).click();
  await expect(page).toHaveURL(/#features/);
  await expect(
    page.getByRole('heading', { name: /everything you need to ship docs/i })
  ).toBeVisible();
});

test('newsletter form shows success on valid email', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /stay updated/i })).toBeVisible();
  // Fill and submit with a valid-looking email
  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByRole('button', { name: /early access/i }).click();
  // Assert success message appears
  await expect(page.getByText(/you're on the list/i)).toBeVisible();
});
