# Scaffold

- `index.html` loads `styles.css` and `app.js` (as a module) and renders `<main><h1>Pulse</h1></main>`.
- `app.js` is an empty module (`export {};`).
- `tests/smoke.spec.js` opens `/` and asserts the title is `Pulse`, the `h1` is visible, and no console or page errors occur.
- `playwright.config.js` runs Chromium and starts `http-server` on `127.0.0.1` at `PORT` (default `4173`) with caching off; it never reuses an existing server.
- `eslint.config.js` ignores `node_modules`, `playwright-report` and `test-results`.
- Pages publishes branch `main`, path `/`, with no workflow file in the repo.
