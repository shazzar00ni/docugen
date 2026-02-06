import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/DocuGen/);

    await expect(page.locator('nav')).toBeVisible();

    await expect(page.locator('h1')).toContainText('Documentation Made Beautiful');
  });

  test('should navigate to sections via anchor links', async ({ page }) => {
    await page.goto('/');

    await page.locator('a[href="#features"]').click();

    await expect(page).toHaveURL(/.*features/);
  });

  test('should submit newsletter form with valid email', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill('test@example.com');
    await submitButton.click();

    await expect(page.locator('text=Thanks for subscribing!')).toBeVisible();
  });

  test('should reject invalid email in newsletter form', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill('invalid-email');
    await submitButton.click();

    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    await expect(page.locator('nav')).toBeVisible();

    const hamburgerButton = page.locator('button[aria-label="Open menu"]');
    await expect(hamburgerButton).toBeVisible();
  });

  test('should show mobile menu when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const hamburgerButton = page.locator('button[aria-label="Open menu"]');
    await hamburgerButton.click();

    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('button[aria-label*="Switch to light mode"]');
    await expect(themeToggle).toBeVisible();

    await themeToggle.click();

    const lightModeToggle = page.locator('button[aria-label*="Switch to dark mode"]');
    await expect(lightModeToggle).toBeVisible();
  });

  test('should render all main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('section').first()).toContainText('Documentation');

    await expect(page.locator('text=How it Works')).toBeVisible();

    await expect(page.locator('text=Features')).toBeVisible();

    await expect(page.locator('text=Pricing')).toBeVisible();
  });

  test('should close mobile menu when clicking close button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const hamburgerButton = page.locator('button[aria-label="Open menu"]');
    await hamburgerButton.click();

    const closeButton = page.locator('button[aria-label="Close menu"]');
    await expect(closeButton).toBeVisible();

    await closeButton.click();

    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should scroll to top when scroll-to-top button is clicked', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.waitForTimeout(500);

    const scrollToTopButton = page.locator('button[aria-label="Scroll to top"]');
    await expect(scrollToTopButton).toBeVisible();

    await scrollToTopButton.click();

    await expect(page).toHaveURL(/.*#$/);
  });
});
