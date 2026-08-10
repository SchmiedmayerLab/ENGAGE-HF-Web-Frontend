//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

const {
  getEslintReactConfig,
} = require("@stanfordspezi/spezi-web-configurations");

module.exports = getEslintReactConfig({ tsconfigRootDir: __dirname });
