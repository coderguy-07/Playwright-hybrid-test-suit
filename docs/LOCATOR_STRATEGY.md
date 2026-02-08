# Locator Strategy Guide

## Why User-Facing Locators?

This project uses **Playwright's user-facing locators** (`getByRole`, `getByPlaceholder`, `getByLabel`, etc.) instead of CSS selectors or XPath. This approach:

✅ **Improves accessibility** - Tests verify the app is usable by all users  
✅ **Increases resilience** - Less brittle than CSS selectors  
✅ **Better readability** - Code reads like user interactions  
✅ **Framework recommendation** - Best practice per Playwright docs

## Locator Hierarchy (Priority Order)

Use this priority when selecting elements:

1. **`getByRole`** - Preferred for semantic elements (buttons, links, headings)
2. **`getByLabel`** - For form inputs with associated labels
3. **`getByPlaceholder`** - For inputs with placeholder text
4. **`getByText`** - For text content
5. **`getByTestId`** - For elements without other semantic markers
6. **`locator`** - Last resort for complex selectors

## Examples

### ✅ Good Examples

```javascript
// Use role for buttons
this.loginButton = page.locator('button.orangehrm-login-button');

// Use placeholder for inputs
this.usernameInput = page.getByPlaceholder('Username');
this.passwordInput = page.getByPlaceholder('Password');

// Use label for form fields
this.employeeNameField = page.getByLabel('Employee Name');

// Use locator for specific classes when needed
this.dashboard = page.locator('.oxd-topbar-header');
this.errorMessage = page.locator('.oxd-alert-content');
```

### ❌ Bad Examples (Avoid)

```javascript
// Don't use CSS selectors as strings
this.loginButton = '#login-btn';

// Don't use XPath
this.username = '//input[@id="username"]';

// Don't use overly specific selectors
this.button = '.container > .row > .col > button.btn.btn-primary';
```

## Best Practices

1. **Store locators in Page Objects**, not in tests
2. **Use descriptive variable names** that match the element's purpose
3. **Prefer exact text matches** when possible
4. **Use regular expressions** only when necessary
5. **Chain locators** for nested elements instead of complex selectors

## Migration Pattern

If you have string-based selectors:

### Before
```javascript
class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.button = '#submit-btn';
  }
  
  async clickButton() {
    await this.click(this.button);
  }
}
```

### After
```javascript
class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.button = page.getByRole('button', { name: 'Submit' });
  }
  
  async clickButton() {
    await this.button.click();
  }
}
```

## Reference

For complete documentation, see:
- [Playwright Locators Guide](https://playwright.dev/docs/locators)
- [Best Practices](https://playwright.dev/docs/best-practices)
