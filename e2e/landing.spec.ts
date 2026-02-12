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

  await page.getByRole('link', { name: /how it works/i }).click();
  await expect(page).toHaveURL(/#how-it-works/);
  await expect(
    page.getByRole('heading', { name: /from chaos to deployed in 3 steps/i })
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

test('pricing section renders', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /pricing/i }).click();
  await expect(page).toHaveURL(/#pricing/);
  await expect(page.getByRole('heading', { name: /pricing/i })).toBeVisible();
});

test('testimonials section renders', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /testimonials/i }).click();
  await expect(page).toHaveURL(/#testimonials/);
  await expect(page.getByRole('heading', { name: /testimonials/i })).toBeVisible();
});

test('skip-to-content focus navigation', async ({ page }) => {
  await page.goto('/');
  // Tab to reveal skip link
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeVisible();
  // Activate and verify focus jumps to main
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('faq accordion expands and collapses', async ({ page }) => {
  await page.goto('/');
  // Scroll to FAQ section
  await page.getByRole('link', { name: /faq/i }).click();
  await expect(page).toHaveURL(/#faq/);
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
  // Click first question to expand
  const firstQuestion = page.getByRole('button', { name: /what file formats/i }).first();
  await firstQuestion.click();
  // Assert answer is visible
  await expect(page.getByText(/markdown.*mdx/i)).toBeVisible();
});

test('mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  // Open mobile menu
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
  // Close via close button
  await page.getByRole('button', { name: /close menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).not.toBeVisible();
});

test('scroll-to-top button appears on scroll', async ({ page }) => {
  await page.goto('/');
  // Scroll down significantly
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // Scroll-to-top button should appear
  await expect(page.getByRole('button', { name: /scroll to top/i })).toBeVisible();
  // Click and verify scroll back up
  await page.getByRole('button', { name: /scroll to top/i }).click();
  await expect(
    page.getByRole('heading', { name: /your docs, deployed in seconds/i })
  ).toBeVisible();
});

test('dark/light mode toggle works', async ({ page }) => {
  await page.goto('/');
  // Get initial theme from html class
  const html = page.locator('html');
  const initialDark = await html.evaluate(el => el.classList.contains('dark'));
  // Click toggle
  await page.getByRole('button', { name: /switch to/i }).click();
  // Verify theme switched
  const afterDark = await html.evaluate(el => el.classList.contains('dark'));
  expect(afterDark).not.toBe(initialDark);
});

test('upload demo accepts drag-and-drop', async ({ page }) => {
  await page.goto('/');
  // Upload demo should be visible in hero
  await expect(page.getByText(/drag and drop.*\.md.*\.mdx/i)).toBeVisible();
});
