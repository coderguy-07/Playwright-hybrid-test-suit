const { chromium } = require('@playwright/test');
const { OrangeHRMLoginPage } = require('./pages/OrangeHRMLoginPage');
const { Env } = require('./utils/env');

/**
 * Global setup to authenticate once and save the state
 * This allows tests to skip login and reuse authentication state
 */
async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new OrangeHRMLoginPage(page);
  await loginPage.navigate();
  await loginPage.login(Env.ORANGEHRM_USERNAME, Env.ORANGEHRM_PASSWORD);

  // Wait for successful login
  await loginPage.waitForLoadState();

  // Save authentication state
  await context.storageState({ path: 'auth.json' });

  await browser.close();
}

module.exports = globalSetup;
