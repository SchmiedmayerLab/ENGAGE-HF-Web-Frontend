//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { toast } from "@stanfordspezi/spezi-web-design-system/components/Toaster";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import {
  base64ToBlob,
  downloadFile,
} from "@stanfordspezi/spezi-web-design-system/utils/file";
import { createFileRoute, Link } from "@tanstack/react-router";
import { query, where } from "firebase/firestore";
import { Contact, DownloadIcon, UserPlus } from "lucide-react";
import { useState } from "react";
import { callables, getCurrentUser, refs } from "@/modules/firebase/app";
import { useIsUserRole } from "@/modules/firebase/UserProvider";
import { routes } from "@/modules/routes";
import { parsePatientsQueries } from "@/modules/user/patients";
import { getNonAdminInvitationsQuery } from "@/modules/user/queries";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";
import { PatientsTable } from "@/routes/~_dashboard/~patients/PatientsTable";
import { getTitle } from "@/utils/head";

const getQueries = async () => {
  const { user } = await getCurrentUser();
  const organizationId = user.organization;
  if (!organizationId)
    throw new Error("Clinician/owner without organization id");
  return {
    patientsQuery: query(
      refs.users(),
      where("organization", "==", organizationId),
    ),
    invitationsQuery: getNonAdminInvitationsQuery([organizationId]),
  };
};

const getAdminQueries = () => ({
  patientsQuery: refs.users(),
  invitationsQuery: refs.invitations(),
});

const listPatients = async () => {
  const { user } = await getCurrentUser();

  return parsePatientsQueries(
    user.type === UserType.admin ? getAdminQueries() : await getQueries(),
  );
};

export type Patient = Awaited<ReturnType<typeof listPatients>>[number];

const ExportOrganizationData = () => {
  const { isUserRole } = useIsUserRole();

  const [isPending, setIsPending] = useState(false);

  const exportData = async () => {
    setIsPending(true);
    try {
      const exportUserData = callables.exportData({});
      toast.promise(exportUserData, {
        loading: `Downloading patients data...`,
        success: `Patients data has been downloaded.`,
        error: `Downloading patients data failed. Please try later.`,
      });
      const response = await exportUserData;
      const blob = base64ToBlob(response.data.content, "application/zip");
      downloadFile(blob, `patients-data.zip`);
    } finally {
      setIsPending(false);
    }
  };

  return isUserRole([UserType.admin, UserType.owner]) ?
      <Button variant="secondary" onClick={exportData} isPending={isPending}>
        <DownloadIcon />
        Export Patients Data
      </Button>
    : null;
};

const PatientsPage = () => {
  const patients = Route.useLoaderData();

  return (
    <DashboardLayout
      title={<PageTitle title="Patients" icon={<Contact />} />}
      actions={
        <div className="flex gap-2">
          <ExportOrganizationData />
          <Button asChild>
            <Link to={routes.patients.invite}>
              <UserPlus />
              Invite Patient
            </Link>
          </Button>
        </div>
      }
    >
      <title>{getTitle("Patients")}</title>
      <PatientsTable data={patients} />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/patients/")({
  component: PatientsPage,
  loader: () => listPatients(),
});
