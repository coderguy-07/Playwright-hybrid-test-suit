const { BasePage } = require('./BasePage');
const { Env } = require('../utils/env');

/**
 * OrangeHRM Login Page Object
 * Handles login functionality for OrangeHRM demo site
 */
class OrangeHRMLoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators based on browser inspection
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('button.orangehrm-login-button');
    this.dashboard = page.locator('.oxd-topbar-header');
    this.errorMessage = page.locator('.oxd-alert-content');
  }

  /**
   * Navigate to OrangeHRM login page
   */
  async navigate() {
    await super.navigate(Env.ORANGEHRM_BASE_URL);
  }

  /**
   * Perform login
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForLoadState();
  }

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    return await this.dashboard.isVisible();
  }

  /**
   * Get error message text
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { OrangeHRMLoginPage };
