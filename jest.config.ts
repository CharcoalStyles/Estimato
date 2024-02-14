import nextJest from "next/jest.js";
import dotenv from "dotenv";

const x = dotenv.config({ path: ".env.test.local" });

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  testEnvironmentOptions: { ...x.parsed, html: true },
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/", "<rootDir>/e2e/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
