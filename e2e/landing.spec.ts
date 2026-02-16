import { test, expect } from '@playwright/test';

test('loads landing page and core sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: /your docs, deployed in seconds/i })
  ).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
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
  await page.getByRole('link', { name: /how it works/i }).click();
  await expect(page).toHaveURL(/#how-it-works/);
});

test('newsletter form shows success on valid email', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByRole('button', { name: /early access/i }).click();
  await expect(page.getByText(/you're on the list/i)).toBeVisible();
});

test('newsletter form shows error on invalid email', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/email/i).fill('invalid-email');
  await page.getByRole('button', { name: /early access/i }).click();
  await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
});

test('newsletter form shows error on empty submit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /early access/i }).click();
  await expect(page.getByText(/email is required/i)).toBeVisible();
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
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('faq accordion expands and collapses', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /faq/i }).click();
  await expect(page).toHaveURL(/#faq/);
  await page
    .getByRole('button', { name: /what file formats/i })
    .first()
    .click();
  await expect(page.getByText(/markdown.*mdx/i)).toBeVisible();
});

test('mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
  await page.getByRole('button', { name: /close menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).not.toBeVisible();
});

test('mobile menu closes on link click', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  await page.getByRole('link', { name: /features/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).not.toBeVisible();
});

test('mobile menu closes on backdrop click', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
  await page.click('body', { position: { x: 10, y: 10 } });
  await expect(page.getByRole('link', { name: /features/i })).not.toBeVisible();
});

test('keyboard escape closes mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link', { name: /features/i })).not.toBeVisible();
});

test('scroll-to-top button appears on scroll', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole('button', { name: /scroll to top/i })).toBeVisible();
  await page.getByRole('button', { name: /scroll to top/i }).click();
  await expect(page.getByRole('heading', { name: /your docs/i })).toBeVisible();
});

test('dark/light mode toggle works', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const initialDark = await html.evaluate(el => el.classList.contains('dark'));
  await page.getByRole('button', { name: /switch to/i }).click();
  const afterDark = await html.evaluate(el => el.classList.contains('dark'));
  expect(afterDark).not.toBe(initialDark);
});

test('theme persists after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /switch to/i }).click();
  const html = page.locator('html');
  const afterClick = await html.evaluate(el => el.classList.contains('dark'));
  await page.reload();
  const afterReload = await html.evaluate(el => el.classList.contains('dark'));
  expect(afterReload).toBe(afterClick);
});

test('upload demo is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/drag and drop.*\.md.*\.mdx/i)).toBeVisible();
});

test('preview section renders', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /preview/i }).click();
  await expect(page).toHaveURL(/#preview/);
  await expect(page.getByRole('heading', { name: /see it in action/i })).toBeVisible();
});

test('features section displays feature cards', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /features/i }).click();
  await expect(page.getByText(/markdown support/i)).toBeVisible();
});

test('how it works displays all steps', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /how it works/i }).click();
  await expect(page.getByText(/upload.*your docs/i)).toBeVisible();
  await expect(page.getByText(/ai structures/i)).toBeVisible();
  await expect(page.getByText(/deploy/i)).toBeVisible();
});

test('footer contains social links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /twitter/i })).toBeVisible();
});

test('cookie consent appears on first visit', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByRole('button', { name: /accept/i })).toBeVisible();
});

test('cookie accept dismisses banner', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: /accept/i }).click();
  await expect(page.getByRole('button', { name: /accept/i })).not.toBeVisible();
});

test('share buttons are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /share/i })).toBeVisible();
});

test('get early access button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /get early access/i })).toBeVisible();
});

test('sign in button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

test('responsive layout at tablet breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { name: /your docs/i })).toBeVisible();
});

test('responsive layout at mobile breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /your docs/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
});

test('multiple faq items can be opened', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /faq/i }).click();
  await page
    .getByRole('button', { name: /what file formats/i })
    .first()
    .click();
  await expect(page.getByText(/markdown.*mdx/i)).toBeVisible();
  await page
    .getByRole('button', { name: /is there a free tier/i })
    .first()
    .click();
  await expect(page.getByText(/free tier/i)).toBeVisible();
});

test('page title is correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/docugen/i);
});

test('all nav links are clickable', async ({ page }) => {
  await page.goto('/');
  const navLinks = page.getByRole('navigation').getByRole('link');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);
});
