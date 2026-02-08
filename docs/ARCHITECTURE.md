# Architecture Overview

## Project Structure

```
playwright-js/
├── api/                    # API testing layer
│   └── OrangeHRMAPI.js     # OAuth2 API client for OrangeHRM
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # This file
│   └── LOCATOR_STRATEGY.md # Locator pattern guide
├── fixtures/               # Test fixtures
│   └── test-base.js        # Custom test fixtures
├── pages/                  # Page Object Model
│   ├── BasePage.js         # Base class with shared utilities
│   ├── OrangeHRMLoginPage.js      # OrangeHRM login page
│   └── OrangeHRMDashboardPage.js  # OrangeHRM dashboard
├── tests/                  # Test specifications
│   ├── orangehrm-api.spec.js   # API tests with OAuth2
│   ├── orangehrm-login.spec.js # UI tests
│   └── visual.spec.js          # Visual regression tests
├── utils/                  # Utilities
│   ├── custom-matchers.js  # Custom assertions
│   └── env.js              # Environment config
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── global-setup.js         # Global test setup
├── package.json            # Dependencies
└── playwright.config.js    # Playwright configuration
```

## Design Patterns

### 1. Page Object Model (POM)

All page interactions are encapsulated in Page Objects that extend `BasePage`.

**Benefits:**
- Single source of truth for selectors
- Easy to maintain
- Reusable across tests

**Example:**
```javascript
class OrangeHRMLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('button.orangehrm-login-button');
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForLoadState();
  }
}
```

### 2. Custom Fixtures

Tests receive pre-configured page objects automatically via fixtures.

**Benefits:**
- No boilerplate in tests
- Consistent setup
- Easy to add new fixtures

**Example:**
```javascript
test('my test', async ({ orangeHRMLoginPage }) => {
  // orangeHRMLoginPage is already initialized
  await orangeHRMLoginPage.navigate();
  await orangeHRMLoginPage.login('Admin', 'admin123');
});
```

### 3. Environment Configuration

All environment-specific values in `Env` class.

**Benefits:**
- Easy to switch environments
- No hardcoded values
- Secure credential management

### 4. Global Setup

Authentication state generated once, reused across tests.

**Benefits:**
- Faster test execution
- Reduced API calls
- Consistent state

## Test Layers

```
┌─────────────────────────────────┐
│   Visual Regression Tests       │ ← Screenshot comparison
├─────────────────────────────────┤
│   End-to-End UI Tests           │ ← Full user flows
├─────────────────────────────────┤
│   API Tests                     │ ← Backend integration
└─────────────────────────────────┘
```

## Configuration

### Playwright Config Highlights

- **Multiple Reporters**: HTML, JSON, JUnit
- **Multi-Browser**: Chromium, Firefox, WebKit
- **Mobile Testing**: Pixel 5, iPhone 12
- **Smart Retries**: CI-aware retry strategy
- **Artifact Collection**: Screenshots, videos, traces on failure

### Environment Variables

| Variable | Purpose | Default |
|:---|:---|:---|
| `ORANGEHRM_BASE_URL` | App URL | https://opensource-demo.orangehrmlive.com/ |
| `ORANGEHRM_USERNAME` | Test username | Admin |
| `ORANGEHRM_PASSWORD` | Test password | admin123 |
| `ORANGEHRM_API_BASE` | API base URL | https://opensource-demo.orangehrmlive.com/web/index.php/api/v2 |
| `ORANGEHRM_CLIENT_ID` | OAuth2 client ID | (optional) |
| `ORANGEHRM_CLIENT_SECRET` | OAuth2 secret | (optional) |
| `HEADED` | Show browser | false |

## CI/CD Integration

### GitHub Actions

The workflow:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Install Playwright browsers
5. Run tests
6. Upload artifacts (reports, screenshots)

## Best Practices

1. **One Page Object per page/component**
2. **Use descriptive locators** (getByRole, getByLabel)
3. **Avoid sleep/wait hardcoded timeouts**
4. **Use fixtures for setup/teardown**
5. **Keep tests independent** - no shared state
6. **Use Page Object methods in tests** - no direct page interaction

## Scaling Guidelines

### Adding New Tests

1. Create Page Object in `pages/`
2. Add fixture to `test-base.js`
3. Write test in `tests/`

### Adding API Tests

1. Create API client in `api/`
2. Add fixture
3. Write test in `tests/`

### Adding Visual Tests

Use `toHaveScreenshot()` matcher in tests.

## Troubleshooting

### Tests Failing Locally

1. Check `.env` file exists (copy from `.env.example`)
2. Run `npm install`
3. Run `npx playwright install`

## References

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
