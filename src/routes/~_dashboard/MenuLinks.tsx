//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { MenuItem } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { useLocation } from "@tanstack/react-router";
import { Home, Users, Contact, Bell, MonitorCog } from "lucide-react";
import { useIsUserRole } from "@/modules/firebase/UserProvider";
import { useHasUnreadNotification } from "@/modules/notifications/queries";
import { routes } from "@/modules/routes";

export const MenuLinks = () => {
  const location = useLocation();
  const { isUserRole } = useIsUserRole();

  const hrefProps = (href: string, exact = false) => ({
    href,
    isActive:
      exact ? location.pathname === href : location.pathname.startsWith(href),
  });

  const { hasUnreadNotification } = useHasUnreadNotification();

  return (
    <>
      <MenuItem
        {...hrefProps(routes.home, true)}
        label="Home"
        icon={<Home />}
      />
      <MenuItem
        {...hrefProps(routes.notifications)}
        label="Notifications"
        isHighlighted={hasUnreadNotification}
        icon={<Bell />}
      />
      {isUserRole([UserType.admin, UserType.owner]) && (
        <MenuItem
          {...hrefProps(routes.users.index)}
          label="Users"
          icon={<Users />}
        />
      )}
      <MenuItem
        {...hrefProps(routes.patients.index)}
        label="Patients"
        icon={<Contact />}
      />
      {isUserRole([UserType.admin]) && (
        <MenuItem
          {...hrefProps(routes.admin)}
          label="Admin"
          icon={<MonitorCog />}
        />
      )}
    </>
  );
};
