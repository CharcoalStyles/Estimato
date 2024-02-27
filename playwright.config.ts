import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.DOMAIN
      ? `https://${process.env.DOMAIN}`
      : "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "on",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "initial-setup",
      testMatch: "**/InitialSetup.spec.ts",
    },
    {
      name: "chromium-setup",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/chromium/auth.json",
      },
      testMatch: "**/UserSetup/*.spec.ts",
      dependencies: ["initial-setup"],
    },
    {
      name: "chromium-main-tests",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/chromium/auth.json",
        trace: "on",
      },
      testMatch: "**/MainTests/*.spec.ts",
      dependencies: ["chromium-setup"],
    },

    // disabled because macOS doesn't support firefox automation
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    {
      name: "webkit-setup",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/webkit/auth.json",
      },
      testMatch: "**/UserSetup/*.spec.ts",
      dependencies: ["initial-setup"],
    },
    {
      name: "webkit-main-tests",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/webkit/auth.json",
        trace: "on",
      },
      testMatch: "**/MainTests/*.spec.ts",
      dependencies: ["webkit-setup"],
    },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  ...(process.env.CI && process.env.DOMAIN
    ? {}
    : {
        webServer: {
          command: "yarn static",
          url: "http://127.0.0.1:3000",
          reuseExistingServer: true,
        },
      }),
});
