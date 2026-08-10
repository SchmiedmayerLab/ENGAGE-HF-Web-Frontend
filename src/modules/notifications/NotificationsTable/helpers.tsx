//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createColumnHelper } from "@tanstack/table-core";
import { type UserMessage } from "@/modules/firebase/models";

export const columnHelper = createColumnHelper<UserMessage>();

export const columnIds = {
  isRead: "isRead",
};
