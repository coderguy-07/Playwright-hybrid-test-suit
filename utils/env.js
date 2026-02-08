/**
 * Utility to access environment variables safely.
 * Provides default values for development.
 */
class Env {
  // OrangeHRM Configuration
  static get ORANGEHRM_BASE_URL() {
    return process.env.ORANGEHRM_BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
  }

  static get ORANGEHRM_USERNAME() {
    return process.env.ORANGEHRM_USERNAME || 'Admin';
  }

  static get ORANGEHRM_PASSWORD() {
    return process.env.ORANGEHRM_PASSWORD || 'admin123';
  }

  static get ORANGEHRM_API_BASE() {
    return (
      process.env.ORANGEHRM_API_BASE ||
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2'
    );
  }

  static get ORANGEHRM_CLIENT_ID() {
    return process.env.ORANGEHRM_CLIENT_ID || '';
  }

  static get ORANGEHRM_CLIENT_SECRET() {
    return process.env.ORANGEHRM_CLIENT_SECRET || '';
  }

  // General Configuration
  static get HEADED() {
    return process.env.HEADED === 'true';
  }
}

module.exports = { Env };
