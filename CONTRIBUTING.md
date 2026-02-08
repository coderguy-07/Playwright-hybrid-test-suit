# Contributing to the Test Suite

Welcome! We appreciate your interest in contributing to this enterprise-grade test automation framework.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Run tests and linting
6. Push and create a Pull Request

## Development Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

## Code Standards

### Locator Strategy

**Always use Playwright's user-facing locators:**

✅ **Good:**
```javascript
page.getByRole('button', { name: 'Login' })
page.getByPlaceholder('Username')
page.getByLabel('Email')
```

❌ **Avoid:**
```javascript
page.locator('#login-btn')
page.locator('//button[@id="login"]')
```

See [docs/LOCATOR_STRATEGY.md](docs/LOCATOR_STRATEGY.md) for complete guidelines.

### Page Object Pattern

1. **Extend BasePage** for all page objects
2. **Store locators as instance variables** in constructor
3. **Create reusable methods** for page interactions
4. **Use Env class** for environment-specific values

**Example:**
```javascript
const { BasePage } = require('./BasePage');
const { Env } = require('../utils/env');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForLoadState();
  }
}
```

### Test Structure

```javascript
const { test, expect } = require('../fixtures/test-base');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ myPage }) => {
    await myPage.navigate();
  });

  test('should do something specific', async ({ myPage }) => {
    // Arrange
    await myPage.prepareData();
    
    // Act
    await myPage.performAction();
    
    // Assert
    await expect(myPage.result).toBeVisible();
  });
});
```

## Code Quality

### Before Committing

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test
```

### Linting Rules

- **No console.log** in production code (use for debugging only)
- **Always await** Playwright actions
- **No page.pause()** in committed code
- **Prefer user-facing locators** over element handles

## Adding New Features

### Adding a New Page Object

1. Create file in `pages/` directory
2. Extend `BasePage`
3. Define locators in constructor
4. Create interaction methods
5. Export the class

### Adding a New Test

1. Create file in `tests/` directory with `.spec.js` extension
2. Import fixtures from `test-base.js`
3. Use `test.describe` for grouping
4. Write descriptive test names
5. Use Page Objects, not direct page interactions

### Adding a New Fixture

1. Open `fixtures/test-base.js`
2. Add to `test.extend()` object
3. Initialize in fixture function
4. Export via `test` object

**Example:**
```javascript
const test = base.extend({
  myPage: async ({ page }, use) => {
    const myPage = new MyPage(page);
    await use(myPage);
  },
});
```

### Adding Custom Matchers

1. Open `utils/custom-matchers.js`
2. Add to `expect.extend()`
3. Return `{ pass, message }`
4. Document usage

## Testing Guidelines

### Test Naming

- Use descriptive names: `should login successfully with valid credentials`
- Start with action verb: `should`, `can`, `displays`
- Be specific about expected outcome

### Test Independence

- **Don't rely on test execution order**
- **Clean up after yourself** (if creating data)
- **Use fixtures** for common setup

### Assertions

- Use **custom matchers** when available
- Prefer **specific assertions** over generic ones
- **Test one thing** per test

## Pull Request Process

1. **Update documentation** if adding features
2. **Add tests** for new functionality
3. **Ensure all tests pass** locally
4. **Run linting** and fix issues
5. **Write clear commit messages**
6. **Reference related issues** in PR description

### Commit Message Format

```
feat: add login page object
fix: correct error message locator
docs: update README with new features
test: add visual regression tests
refactor: simplify BasePage utilities
```

### PR Checklist

- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated (if needed)
- [ ] Environment variables documented (if added)
- [ ] No breaking changes (or clearly documented)

## Common Issues

### Tests failing locally?

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Linting errors?

```bash
npm run lint:fix
```

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Clarification on patterns
- General questions

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn

---

Thank you for contributing! 🎉
