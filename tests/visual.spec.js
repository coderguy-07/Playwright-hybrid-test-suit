const { test, expect } = require('../fixtures/test-base');

test.describe('OrangeHRM Visual Regression Tests', () => {
  test('should match login page screenshot', async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.navigate();

    // Take screenshot and compare (Playwright handles visual comparison)
    await expect(orangeHRMLoginPage.page).toHaveScreenshot('orangehrm-login-page.png');
  });

  test('should match dashboard screenshot after login', async ({ orangeHRMLoginPage, page }) => {
    await orangeHRMLoginPage.navigate();
    await orangeHRMLoginPage.login('Admin', 'admin123');

    // Wait for dashboard to load
    await expect(orangeHRMLoginPage.dashboard).toBeVisible();

    // Take screenshot
    await expect(page).toHaveScreenshot('orangehrm-dashboard.png');
  });

  test('should match error message screenshot', async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.navigate();
    await orangeHRMLoginPage.login('invalid', 'invalid');

    // Wait for error
    await expect(orangeHRMLoginPage.errorMessage).toBeVisible();

    // Screenshot specific element
    await expect(orangeHRMLoginPage.errorMessage).toHaveScreenshot('orangehrm-error.png');
  });
});
