/**
 * BasePage class to be extended by other page objects.
 * Contains shared utilities for common Playwright operations.
 *
 * Note: This class no longer provides string-based selector wrappers.
 * Use Playwright's Locator objects directly in page objects.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - Full or relative URL
   * @param {object} options - Navigation options
   */
  async navigate(url, options = {}) {
    await this.page.goto(url, options);
  }

  /**
   * Wait for page to reach a specific load state
   * @param {string} state - 'load', 'domcontentloaded', or 'networkidle'
   */
  async waitForLoadState(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for URL to match a pattern
   * @param {string|RegExp} urlPattern - URL pattern to wait for
   * @param {object} options - Wait options
   */
  async waitForURL(urlPattern, options = {}) {
    await this.page.waitForURL(urlPattern, options);
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot filename (without extension)
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async screenshot(name) {
    return await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Reload the current page
   * @param {object} options - Reload options
   */
  async reload(options = {}) {
    await this.page.reload(options);
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  getCurrentURL() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }
}

module.exports = { BasePage };
