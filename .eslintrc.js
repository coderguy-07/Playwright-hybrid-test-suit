module.exports = {
  extends: ['eslint:recommended', 'plugin:playwright/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    'no-console': 'warn',
    'playwright/missing-playwright-await': 'error',
    'playwright/no-page-pause': 'warn',
    'playwright/no-element-handle': 'warn',
    'prettier/prettier': 'error',
  },
};
