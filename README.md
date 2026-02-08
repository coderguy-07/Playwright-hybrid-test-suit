# Enterprise Playwright JS Test Suite

An **enterprise-grade test automation framework** built with [Playwright](https://playwright.dev/) and JavaScript, featuring the Page Object Model, API testing, visual regression, and Docker support.

## 🚀 Features

- ✅ **Page Object Model** - Maintainable, scalable architecture
- ✅ **Multi-Layer Testing** - UI, API, and visual regression
- ✅ **Custom Fixtures** - Auto-injected page objects and API clients
- ✅ **Global Setup** - Reusable authentication state
- ✅ **Custom Matchers** - Domain-specific assertions
- ✅ **Multi-Browser** - Chromium, Firefox, WebKit, Mobile
- ✅ **Advanced Reporting** - HTML, JSON, JUnit XML
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **Environment Config** - Secure credential management

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd Playwright-JS

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment template
cp .env.example .env
```

## 🎯 Quick Start

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/sauce-demo.spec.js

# Run in headed mode
HEADED=true npm test

# Run with specific browser
npx playwright test --project=chromium

# Run visual regression tests
npx playwright test tests/visual.spec.js
```

## 📁 Project Structure

```
playwright-js/
├── api/                    # API testing layer
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # System architecture
│   └── LOCATOR_STRATEGY.md # Locator patterns
├── fixtures/               # Test fixtures
├── pages/                  # Page Object Model
├── tests/                  # Test specifications
│   ├── api.spec.js         # API tests
│   ├── sauce-demo.spec.js  # UI tests
│   └── visual.spec.js      # Visual tests
├── utils/                  # Utilities
└── playwright.config.js    # Configuration
```

## 🧪 Writing Tests

### Page Object Pattern

```javascript
// pages/MyPage.js
class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.button = page.getByRole('button', { name: 'Submit' });
  }
  
  async submit() {
    await this.button.click();
  }
}
```

### Test Example

```javascript
// tests/my-test.spec.js const { test, expect } = require('../fixtures/test-base');

test('should submit form', async ({ myPage }) => {
  await myPage.navigate();
  await myPage.submit();
  await expect(myPage.successMessage).toBeVisible();
});
```

See [docs/LOCATOR_STRATEGY.md](docs/LOCATOR_STRATEGY.md) for detailed guidelines.

## 🎨 Custom Matchers

```javascript
// Check if user is logged in
await expect(sauceLoginPage).toBeLoggedIn();

// Check product count
await expect(sauceLoginPage).toHaveProductCount(6);
```

## 📊 Reporting

After running tests:

```bash
# Open HTML report
npx playwright show-report

# View JSON results
cat test-results/results.json

# View JUnit XML
cat test-results/junit.xml
```

## 🔧 Configuration

Environment variables (`.env` file):

| Variable | Description | Default |
|:---|:---|:---|
| `SAUCE_BASE_URL` | Application URL | https://www.saucedemo.com/ |
| `SAUCE_USER` | Test username | standard_user |
| `SAUCE_PASSWORD` | Test password | secret_sauce |
| `HEADED` | Show browser UI | false |

## 🌐 CI/CD

GitHub Actions workflow runs automatically on push/PR to `main` or `master` branches.

Artifacts include:
- Test reports
- Screenshots (on failure)
- Videos (on failure)
- Trace files (on failure)

## 📖 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Locator Strategy](docs/LOCATOR_STRATEGY.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

MIT

## 🆘 Troubleshooting

### Tests not running?

```bash
npm install
npx playwright install
```

### Environment issues?

Ensure `.env` file exists (copy from `.env.example`)

## 📬 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ using [Playwright](https://playwright.dev/)**
