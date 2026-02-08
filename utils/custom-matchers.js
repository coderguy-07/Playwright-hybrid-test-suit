const { expect } = require('@playwright/test');

/**
 * Custom matchers for cleaner test assertions
 */
expect.extend({
  /**
   * Check if element count matches expected
   */
  async toHaveCount(locator, expected) {
    const count = await locator.count();
    const pass = count === expected;

    return {
      message: () =>
        pass
          ? `Expected element count NOT to be ${expected}, but got ${count}`
          : `Expected element count to be ${expected}, but got ${count}`,
      pass,
    };
  },

  /**
   * Check if user is logged in (OrangeHRM specific)
   */
  async toBeLoggedIn(loginPage) {
    const isVisible = await loginPage.dashboard.isVisible();
    const pass = isVisible;

    return {
      message: () =>
        pass
          ? 'Expected user NOT to be logged in, but dashboard is visible'
          : 'Expected user to be logged in, but dashboard is not visible',
      pass,
    };
  },

  /**
   * Check if specific menu item is visible (OrangeHRM specific)
   */
  async toHaveMenuVisible(dashboard, menuName) {
    const menuLocators = {
      admin: dashboard.adminMenu,
      pim: dashboard.pimMenu,
      leave: dashboard.leaveMenu,
      time: dashboard.timeMenu,
    };

    const menu = menuLocators[menuName.toLowerCase()];
    if (!menu) {
      throw new Error(`Unknown menu: ${menuName}`);
    }

    const isVisible = await menu.isVisible();
    const pass = isVisible;

    return {
      message: () =>
        pass
          ? `Expected ${menuName} menu NOT to be visible`
          : `Expected ${menuName} menu to be visible`,
      pass,
    };
  },
});

module.exports = expect;
