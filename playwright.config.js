import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    // Set viewport size
    viewport: { width: 1280, height: 720 },
    // Add actionTimeout
    actionTimeout: 10000,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes
  },
  expect: {
    timeout: 10000,
  },
  // Run tests in parallel in CI
  workers: process.env.CI ? 2 : undefined,
  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
