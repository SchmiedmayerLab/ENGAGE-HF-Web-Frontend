//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { startCase } from "es-toolkit";

export enum AllergyType {
  severeAllergy = "severeAllergy",
  allergy = "allergy",
  intolerance = "intolerance",
  financial = "financial",
  preference = "preference",
}

export const stringifyAllergyType = (type: AllergyType) => startCase(type);
