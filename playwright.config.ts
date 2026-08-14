//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { defineConfig, devices } from "@playwright/test";

// The end-to-end tests run against the seeded Firebase emulators from the
// ENGAGE-HF-Firebase submodule; `npm run test:e2e` boots and seeds them.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev -- --port 5173",
    url: "http://localhost:5173",
    // Never reuse a server this configuration did not start: it would not carry the emulator
    // environment below and could point the tests at another Firebase project.
    reuseExistingServer: false,
    env: {
      VITE_PUBLIC_FIREBASE_API_KEY: "example",
      VITE_PUBLIC_FIREBASE_APP_ID: "1:example:web",
      VITE_PUBLIC_FIREBASE_AUTH_DOMAIN: "example.firebaseapp.com",
      VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "123467890",
      VITE_PUBLIC_FIREBASE_PROJECT_ID: "demo-engage-hf",
      VITE_PUBLIC_FIREBASE_STORAGE_BUCKET: "example.appspot.com",
      VITE_PUBLIC_EMULATOR: "true",
      VITE_PUBLIC_EMAIL_PASSWORD_SIGN_IN: "true",
    },
  },
});
