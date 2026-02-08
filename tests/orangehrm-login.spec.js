const { test, expect } = require('../fixtures/test-base');
const { Env } = require('../utils/env');

test.describe('OrangeHRM Login Tests', () => {
  test.beforeEach(async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.login(Env.ORANGEHRM_USERNAME, Env.ORANGEHRM_PASSWORD);

    // Verify dashboard is visible
    await expect(orangeHRMLoginPage.dashboard).toBeVisible();

    // Verify login state
    const isLoggedIn = await orangeHRMLoginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should show error message with invalid credentials', async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.login('InvalidUser', 'InvalidPassword');

    // Verify error message appears
    await expect(orangeHRMLoginPage.errorMessage).toBeVisible();

    // Verify user is not logged in
    const isLoggedIn = await orangeHRMLoginPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });

  test('should not login with empty credentials', async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.login('', '');

    // Verify still on login page (button might be disabled or error shown)
    const isLoggedIn = await orangeHRMLoginPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });
});

test.describe('OrangeHRM Navigation Tests', () => {
  test.beforeEach(async ({ orangeHRMLoginPage }) => {
    await orangeHRMLoginPage.navigate();
    await orangeHRMLoginPage.login(Env.ORANGEHRM_USERNAME, Env.ORANGEHRM_PASSWORD);
  });

  test('should navigate to employee section', async ({ orangeHRMDashboard, page }) => {
    await orangeHRMDashboard.navigateToEmployees();

    // Verify URL contains pim
    expect(page.url()).toContain('pim');
  });

  test('should navigate to leave section', async ({ orangeHRMDashboard, page }) => {
    await orangeHRMDashboard.navigateToLeave();

    // Verify URL contains leave
    expect(page.url()).toContain('leave');
  });

  test('should logout successfully', async ({ orangeHRMDashboard, orangeHRMLoginPage, page }) => {
    await orangeHRMDashboard.logout();

    // Verify redirected to login page
    await expect(orangeHRMLoginPage.loginButton).toBeVisible();
  });
});
