//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from "node:path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  root: ".",
  plugins: [
    react(),
    tanstackRouter({
      routeFilePrefix: "~",
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeTreeFileHeader: [
        `//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//`,
        "/* prettier-ignore-start */",
        "/* eslint-disable */",
        "// @ts-nocheck",
        "// noinspection JSUnusedGlobalSymbols",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/testSetup.ts"],
    exclude: [...configDefaults.exclude, "e2e/**", "ENGAGE-HF-Firebase/**"],
  },
});
