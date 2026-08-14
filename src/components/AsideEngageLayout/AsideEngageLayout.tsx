//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  AsideBrandLayoutAside,
  AsideBrandLayoutMain,
  AsideBrandLayoutRoot,
} from "@schmiedmayerlab/grove-design-system/molecules/AsideBrandLayout";
import { type ReactNode } from "react";
import { Logo } from "@/components/icons/Logo";
import { LogoType } from "@/components/icons/LogoType";

interface AsideEngageLayoutProps {
  children?: ReactNode;
}

export const AsideEngageLayout = ({ children }: AsideEngageLayoutProps) => (
  <AsideBrandLayoutRoot>
    <AsideBrandLayoutAside>
      <div className="flex-center text-primary gap-6">
        <div className="flex-center bg-primary size-20 rounded-lg">
          <Logo className="w-10 text-white" />
        </div>
        <LogoType className="h-auto w-48" />
      </div>
      <img
        src="/stanfordmedicine-light.png"
        alt="Stanford Medicine"
        className="theme-light-only w-72"
      />
      <img
        src="/stanfordmedicine-dark.png"
        alt="Stanford Medicine"
        className="theme-dark-only w-72"
      />
    </AsideBrandLayoutAside>
    <AsideBrandLayoutMain>{children}</AsideBrandLayoutMain>
  </AsideBrandLayoutRoot>
);
