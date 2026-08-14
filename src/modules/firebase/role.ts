//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type UserType } from "@schmiedmayerlab/engagehf-models";
import { upperFirst } from "@schmiedmayerlab/grove-design-system/utils/misc";

export const stringifyType = (type: UserType) => upperFirst(type);
