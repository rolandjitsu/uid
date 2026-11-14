import {defineConfig} from "@playwright/test";

// End-to-end tests in real Chromium exercising Web Crypto and the built dist/index.js bundle.
// `npm run build` runs first via `pretest:e2e`.
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: {
    browserName: "chromium",
    headless: true
  }
});
