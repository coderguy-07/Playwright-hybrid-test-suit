const base = require('@playwright/test');
const { OrangeHRMLoginPage } = require('../pages/OrangeHRMLoginPage');
const { OrangeHRMDashboardPage } = require('../pages/OrangeHRMDashboardPage');
const { OrangeHRMAPI } = require('../api/OrangeHRMAPI');
const customMatchers = require('../utils/custom-matchers');

/**
 * Extend Playwright test with custom fixtures
 */
const test = base.extend({
  orangeHRMLoginPage: async ({ page }, use) => {
    const orangeHRMLoginPage = new OrangeHRMLoginPage(page);
    await use(orangeHRMLoginPage);
  },

  orangeHRMDashboard: async ({ page }, use) => {
    const dashboard = new OrangeHRMDashboardPage(page);
    await use(dashboard);
  },

  authenticatedUser: async ({ page }, use) => {
    const loginPage = new OrangeHRMLoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    await use(loginPage);
  },

  orangeHRMAPI: async ({ request }, use) => {
    const api = new OrangeHRMAPI(request);
    await use(api);
  },
});

const { expect } = test;

module.exports = { test, expect };
