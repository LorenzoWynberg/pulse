# Checks

Shape: [Scaffold](../tech-guide/scaffold/layout.md)

- A change passes `npm run check` before it merges.
- Code is formatted by Prettier with `singleQuote` (`.prettierrc.json`); files Prettier skips are listed in `.prettierignore`.
- ESLint uses `eslint.config.js`; `app.js` gets browser globals, `*.config.js` and `tests/**` get Node globals.
