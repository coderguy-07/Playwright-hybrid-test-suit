const { BasePage } = require('./BasePage');

/**
 * OrangeHRM Dashboard Page Object
 * Handles navigation and dashboard interactions
 */
class OrangeHRMDashboardPage extends BasePage {
  constructor(page) {
    super(page);
    // Main menu items
    this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');
    this.pimMenu = page.locator('a[href*="pim/viewPimModule"]'); // Employee list
    this.leaveMenu = page.locator('a[href*="leave/viewLeaveModule"]');
    this.timeMenu = page.locator('a[href*="time/viewTimeModule"]');
    this.performanceMenu = page.locator('a[href*="performance/viewPerformanceModule"]');
    this.dashboardMenu = page.locator('a[href*="dashboard/index"]');

    // User dropdown and logout
    this.userDropdown = page.locator('span.oxd-userdropdown-tab');
    this.logoutLink = page.locator('a[href*="auth/logout"]');

    // Quick launch widgets
    this.assignLeaveBtn = page.locator('button[title="Assign Leave"]');
    this.leaveListBtn = page.locator('button[title="Leave List"]');
    this.applyLeaveBtn = page.locator('button[title="Apply Leave"]');
  }

  /**
   * Navigate to Admin section
   */
  async navigateToAdmin() {
    await this.adminMenu.click();
    await this.waitForLoadState();
  }

  /**
   * Navigate to Employee (PIM) section
   */
  async navigateToEmployees() {
    await this.pimMenu.click();
    await this.waitForLoadState();
  }

  /**
   * Navigate to Leave section
   */
  async navigateToLeave() {
    await this.leaveMenu.click();
    await this.waitForLoadState();
  }

  /**
   * Navigate to Time (Attendance) section
   */
  async navigateToTime() {
    await this.timeMenu.click();
    await this.waitForLoadState();
  }

  /**
   * Logout from application
   */
  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}

module.exports = { OrangeHRMDashboardPage };
