//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { CopyText } from "@schmiedmayerlab/grove-design-system/components/CopyText";
import { Tooltip } from "@schmiedmayerlab/grove-design-system/components/Tooltip";
import { type Nil } from "@schmiedmayerlab/grove-design-system/utils/misc";
import { createColumnHelper } from "@tanstack/table-core";
import { Mail, ShieldX } from "lucide-react";

export interface SharedUser {
  resourceType: "invitation" | "user";
  resourceId: string;
  displayName: Nil<string>;
  email: Nil<string>;
  organization: Nil<{ name: string }>;
  disabled: boolean | undefined;
}

export const userColumnIds = {
  organization: "organization",
};

export const createSharedUserColumns = <User extends SharedUser>() => {
  const columnHelper = createColumnHelper<User>();
  return {
    id: columnHelper.accessor(
      (user) =>
        user.resourceType === "invitation" ? "invitation" : user.resourceId,
      {
        header: "Id",
        cell: (props) => {
          const user = props.row.original;
          if (user.resourceType === "invitation") {
            return (
              <Tooltip tooltip="User hasn't logged in yet">
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground size-5" />
                  Invitation
                </div>
              </Tooltip>
            );
          }
          if (!user.resourceId) return <>-</>;
          return (
            <CopyText className="max-w-[7rem]">{user.resourceId}</CopyText>
          );
        },
      },
    ),
    displayName: columnHelper.accessor((user) => user.displayName, {
      header: "Name",
      cell: (props) => props.getValue() ?? "-",
    }),
    email: columnHelper.accessor((user) => user.email, { header: "Email" }),
    organization: columnHelper.accessor((user) => user.organization?.name, {
      id: userColumnIds.organization,
      header: "Organization",
    }),
    disabled: columnHelper.accessor((user) => user.disabled, {
      header: "Disabled",
      cell: (props) =>
        props.row.original.disabled ?
          <span className="flex items-center gap-2">
            <ShieldX className="size-5" /> Disabled
          </span>
        : null,
    }),
  };
};
