//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { deleteDoc } from "@firebase/firestore";
import { UserType } from "@schmiedmayerlab/engagehf-models";
import { RowDropdownMenu } from "@stanfordspezi/spezi-web-design-system/components/DataTable";
import { DropdownMenuItem } from "@stanfordspezi/spezi-web-design-system/components/DropdownMenu";
import { getUserName } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { ConfirmDeleteDialog } from "@stanfordspezi/spezi-web-design-system/molecules/ConfirmDeleteDialog";
import { useOpenState } from "@stanfordspezi/spezi-web-design-system/utils/useOpenState";
import { Link, useRouter } from "@tanstack/react-router";
import { Pencil, Trash, DownloadIcon, FileUser } from "lucide-react";
import { callables, docRefs } from "@/modules/firebase/app";
import { useIsUserRole } from "@/modules/firebase/UserProvider";
import { routes } from "@/modules/routes";
import {
  useDownloadPatientData,
  useDownloadPatientHealthSummary,
} from "@/modules/user/patients";
import { ToggleUserDisabled } from "@/modules/user/ToggleUserDisabled";
import { type Patient } from "@/routes/~_dashboard/~patients/~index";

interface PatientMenuProps {
  patient: Patient;
}

export const PatientMenu = ({ patient }: PatientMenuProps) => {
  const { isUserRole } = useIsUserRole();
  const router = useRouter();
  const deleteConfirm = useOpenState();
  const downloadPatientData = useDownloadPatientData();
  const downloadPatientHealthSummary = useDownloadPatientHealthSummary();

  const handleDelete = async () => {
    if (patient.resourceType === "user") {
      await callables.deleteUser({ userId: patient.resourceId });
    } else {
      await deleteDoc(docRefs.invitation(patient.resourceId));
    }
    deleteConfirm.close();
    await router.invalidate();
  };

  return (
    <>
      <ConfirmDeleteDialog
        open={deleteConfirm.isOpen}
        onOpenChange={deleteConfirm.setIsOpen}
        entityName="patient"
        itemName={getUserName(patient)}
        onDelete={handleDelete}
      />
      <RowDropdownMenu>
        <DropdownMenuItem asChild>
          <Link
            to={routes.patients.patient(
              patient.resourceId,
              patient.resourceType,
            )}
          >
            <Pencil />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteConfirm.open}>
          <Trash />
          Delete
        </DropdownMenuItem>
        <ToggleUserDisabled user={patient} />
        {patient.resourceType === "user" &&
          isUserRole([UserType.admin, UserType.owner]) && (
            <DropdownMenuItem
              onClick={() =>
                downloadPatientData.mutateAsync({
                  userId: patient.resourceId,
                  userName: patient.displayName ?? patient.resourceId,
                })
              }
            >
              <DownloadIcon />
              Export Data
            </DropdownMenuItem>
          )}
        {patient.resourceType === "user" && (
          <DropdownMenuItem
            onClick={() =>
              downloadPatientHealthSummary.mutateAsync({
                userId: patient.resourceId,
                userName: patient.displayName ?? patient.resourceId,
              })
            }
          >
            <FileUser />
            Export Health Summary
          </DropdownMenuItem>
        )}
      </RowDropdownMenu>
    </>
  );
};
