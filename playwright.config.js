import { defineConfig, devices } from '@playwright/test';

const port = process.env.PORT || '4173';
const url = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  use: { baseURL: url },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx http-server . -a 127.0.0.1 -p ${port} -c-1 --silent`,
    url,
    reuseExistingServer: false,
  },
});
