//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { GroveProvider } from "@schmiedmayerlab/grove-design-system";
import { Toaster } from "@schmiedmayerlab/grove-design-system/components/Toaster";
import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { type ComponentProps } from "react";
import { auth } from "@/modules/firebase/app";
import {
  AuthProvider,
  isRouteProtected,
} from "@/modules/firebase/AuthProvider";
import { ReactQueryClientProvider } from "@/modules/query/ReactQueryClientProvider";
import { routes } from "@/modules/routes";
import "../modules/globals.css";

const routerProps: ComponentProps<typeof GroveProvider>["router"] = {
  Link: ({ href, ...props }) => <Link to={href} {...props} />,
};

const Root = () => (
  <AuthProvider>
    <GroveProvider router={routerProps} colorScheme="system">
      <ReactQueryClientProvider>
        {/* base.css colors the body, which sits outside the provider's theme scope. */}
        <div className="bg-surface min-h-screen">
          <Outlet />
        </div>
        <Toaster />
      </ReactQueryClientProvider>
    </GroveProvider>
  </AuthProvider>
);

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    await auth.authStateReady();
    const user = auth.currentUser;
    if (location.pathname === routes.signIn && user) {
      throw redirect({ to: routes.home });
    } else if (isRouteProtected(location.pathname) && !user) {
      throw redirect({ to: routes.signIn });
    }
  },
});
