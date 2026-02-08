const { Env } = require('../utils/env');

/**
 * OrangeHRM API Client
 * Implements OAuth2 authentication and REST API calls
 *
 * Note: OAuth2 client must be registered in OrangeHRM first:
 * Admin > Configuration > Authentication > OAuth Clients
 */
class OrangeHRMAPI {
  constructor(request) {
    this.request = request;
    this.baseURL = Env.ORANGEHRM_API_BASE;
    this.accessToken = null;
  }

  /**
   * Authenticate using OAuth2 client credentials
   * @returns {Promise<string>} Access token
   */
  async authenticate() {
    if (!Env.ORANGEHRM_CLIENT_ID || !Env.ORANGEHRM_CLIENT_SECRET) {
      throw new Error(
        'OAuth2 credentials not configured. Set ORANGEHRM_CLIENT_ID and ORANGEHRM_CLIENT_SECRET in .env'
      );
    }

    try {
      const response = await this.request.post(`${Env.ORANGEHRM_BASE_URL}oauth/issueToken`, {
        data: {
          client_id: Env.ORANGEHRM_CLIENT_ID,
          client_secret: Env.ORANGEHRM_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      throw new Error(`OAuth2 authentication failed: ${error.message}`);
    }
  }

  /**
   * Get authorization headers for API requests
   * @returns {Object} Headers object
   */
  getHeaders() {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get employee list
   * @returns {Promise<Object>} Employee data
   */
  async getEmployees() {
    const response = await this.request.get(`${this.baseURL}/pim/employees`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  /**
   * Get employee by ID
   * @param {number} employeeId
   * @returns {Promise<Object>} Employee details
   */
  async getEmployee(employeeId) {
    const response = await this.request.get(`${this.baseURL}/pim/employees/${employeeId}`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  /**
   * Get leave requests
   * @returns {Promise<Object>} Leave requests data
   */
  async getLeaveRequests() {
    const response = await this.request.get(`${this.baseURL}/leave/leave-requests`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  /**
   * Get leave types
   * @returns {Promise<Object>} Leave types data
   */
  async getLeaveTypes() {
    const response = await this.request.get(`${this.baseURL}/leave/leave-types`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  /**
   * Get attendance records
   * @returns {Promise<Object>} Attendance data
   */
  async getAttendanceRecords() {
    const response = await this.request.get(`${this.baseURL}/attendance/records`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }
}

module.exports = { OrangeHRMAPI };
