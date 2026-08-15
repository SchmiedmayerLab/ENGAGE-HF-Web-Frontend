//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

const {
  getEslintReactConfig,
} = require("@schmiedmayerlab/grove-configurations");

module.exports = [
  // The backend submodule lints itself with its own configuration.
  { ignores: ["ENGAGE-HF-Firebase/**"] },
  ...getEslintReactConfig({ tsconfigRootDir: __dirname }),
  {
    rules: {
      // TanStack Router redirects and not-found results are thrown by design.
      "@typescript-eslint/only-throw-error": "off",
    },
  },
  {
    files: [
      "src/routes/~_dashboard/~patients/actions.tsx",
      "src/routes/~_dashboard/~patients/clientUtils.ts",
    ],
    rules: {
      // These values are canonical FHIR system identifiers, not network requests.
      "sonarjs/no-clear-text-protocols": "off",
    },
  },
];
