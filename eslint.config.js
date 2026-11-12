import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules', 'playwright-report', 'test-results'] },
  js.configs.recommended,
  { files: ['app.js'], languageOptions: { globals: globals.browser } },
  {
    files: ['*.config.js', 'tests/**'],
    languageOptions: { globals: globals.node },
  },
];
