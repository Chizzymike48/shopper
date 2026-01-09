import { test, expect } from '@playwright/test';

test('admin can login and see dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for navigation to /admin
  await page.waitForURL('**/admin', { timeout: 5000 });
  await expect(page.locator('h1', { hasText: 'Admin Dashboard' })).toBeVisible();
});
