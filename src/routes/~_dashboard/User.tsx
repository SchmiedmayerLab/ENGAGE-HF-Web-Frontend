//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@schmiedmayerlab/grove-design-system/components/DropdownMenu";
import {
  getUserName,
  type UserInfo,
} from "@schmiedmayerlab/grove-design-system/modules/auth";
import { UserMenuItem } from "@schmiedmayerlab/grove-design-system/molecules/DashboardLayout";
import { LogOut } from "lucide-react";
import { auth } from "@/modules/firebase/app";

interface UserProps {
  user: UserInfo;
}

export const User = ({ user }: UserProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <UserMenuItem img={user.photoURL} name={getUserName(user)} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        onClick={async () => {
          await auth.signOut();
        }}
      >
        <LogOut />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
