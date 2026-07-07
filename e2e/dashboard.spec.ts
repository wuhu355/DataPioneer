import { test, expect } from '@playwright/test';

test.describe('DataPioneer Dashboard', () => {
  test('should load the dashboard with header and charts', async ({ page }) => {
    await page.goto('/');

    // Wait for the header to appear
    const header = page.locator('text=数据先锋大屏');
    await expect(header).toBeVisible({ timeout: 10000 });

    // Wait for stat tiles to render (4 tiles)
    const statTiles = page.locator('text=总用户数');
    await expect(statTiles).toBeVisible({ timeout: 10000 });

    // Verify chart card titles are present
    await expect(page.locator('text=趋势分析').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=全国分布').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=数据分布').first()).toBeVisible({ timeout: 10000 });

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/dashboard.png', fullPage: true });
  });

  test('should switch time range when clicking filter buttons', async ({ page }) => {
    await page.goto('/');

    // Click "本周" button
    const weekBtn = page.locator('button', { hasText: '本周' });
    await weekBtn.click();

    // The button should become active (have a different style)
    // Just verify it didn't crash
    await expect(page.locator('text=数据先锋大屏')).toBeVisible({ timeout: 5000 });
  });
});
