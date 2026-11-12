# Pulse

Pulse is a static page (`index.html`, `styles.css`, `app.js`) served from the repo root; GitHub Pages publishes `main` at `/`. The page currently shows the title "Pulse" and an `h1`.

## Commands

- `npm run lint`: `prettier --check .` then `eslint .`
- `npm test`: Playwright smoke test
- `npm run check`: lint, then test. Every change passes it.

## Pages

- [Checks](rules/checks.md): what a change must pass
- [Scaffold](tech-guide/scaffold/layout.md): files, tooling and the test server
- [Counter](tech-guide/counter/behaviour.md): state, persistence and animation
