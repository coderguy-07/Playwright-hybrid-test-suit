const { test, expect } = require('../fixtures/test-base');

test.describe('OrangeHRM API Tests', () => {
  test('should authenticate via OAuth2', async ({ orangeHRMAPI }) => {
    // This test requires OAuth2 client to be registered
    // Skip if credentials not configured
    test.skip(
      !process.env.ORANGEHRM_CLIENT_ID || !process.env.ORANGEHRM_CLIENT_SECRET,
      'OAuth2 credentials not configured. Set ORANGEHRM_CLIENT_ID and ORANGEHRM_CLIENT_SECRET'
    );

    const token = await orangeHRMAPI.authenticate();

    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
    expect(typeof token).toBe('string');
  });

  test('should get employee list', async ({ orangeHRMAPI }) => {
    test.skip(
      !process.env.ORANGEHRM_CLIENT_ID || !process.env.ORANGEHRM_CLIENT_SECRET,
      'OAuth2 credentials not configured'
    );

    await orangeHRMAPI.authenticate();
    const response = await orangeHRMAPI.getEmployees();

    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });

  test('should get leave types', async ({ orangeHRMAPI }) => {
    test.skip(
      !process.env.ORANGEHRM_CLIENT_ID || !process.env.ORANGEHRM_CLIENT_SECRET,
      'OAuth2 credentials not configured'
    );

    await orangeHRMAPI.authenticate();
    const response = await orangeHRMAPI.getLeaveTypes();

    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });

  test('should get leave requests', async ({ orangeHRMAPI }) => {
    test.skip(
      !process.env.ORANGEHRM_CLIENT_ID || !process.env.ORANGEHRM_CLIENT_SECRET,
      'OAuth2 credentials not configured'
    );

    await orangeHRMAPI.authenticate();
    const response = await orangeHRMAPI.getLeaveRequests();

    expect(response).toBeDefined();
  });
});

test.describe('OrangeHRM API Tests (Mock - OAuth2 not configured)', () => {
  test('should indicate OAuth2 setup required', async ({ orangeHRMAPI }) => {
    // This test documents the OAuth2 requirement
    try {
      await orangeHRMAPI.authenticate();
    } catch (error) {
      expect(error.message).toContain('OAuth2 credentials not configured');
    }
  });
});
