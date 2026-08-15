//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@schmiedmayerlab/engagehf-models";
import {
  DataTable,
  type DataTableProps,
} from "@schmiedmayerlab/grove-design-system/components/DataTable";
import { Tooltip } from "@schmiedmayerlab/grove-design-system/components/Tooltip";
import { type RequiredSome } from "@schmiedmayerlab/grove-design-system/utils/misc";
import { createColumnHelper } from "@tanstack/table-core";
import { FileInput, RefreshCw, ShieldX } from "lucide-react";
import { useMemo } from "react";
import { useUser } from "@/modules/firebase/UserProvider";
import { routes } from "@/modules/routes";
import { createSharedUserColumns, userColumnIds } from "@/modules/user/table";
import { PatientMenu } from "@/routes/~_dashboard/~patients/PatientMenu";
import { type Patient } from "@/routes/~_dashboard/~patients/~index";
import { useNavigateOrOpen } from "@/utils/useNavigateOrOpen";

const columnHelper = createColumnHelper<Patient>();
const userColumns = createSharedUserColumns<Patient>();
const columns = [
  userColumns.id,
  userColumns.displayName,
  userColumns.email,
  userColumns.organization,
  columnHelper.display({
    id: "status",
    header: "Status",
    cell: (props) => {
      const patient = props.row.original;
      return (
        <div className="flex items-center gap-2">
          {patient.disabled && (
            <Tooltip tooltip="Disabled">
              <ShieldX className="size-5" />
            </Tooltip>
          )}
          {patient.selfManaged && (
            <Tooltip tooltip="Self managed">
              <FileInput className="size-5" />
            </Tooltip>
          )}
          {patient.permanent && (
            <Tooltip tooltip="Permanent invitation">
              <RefreshCw className="size-5" />
            </Tooltip>
          )}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <PatientMenu patient={props.row.original} />,
  }),
];

interface PatientsDataTableProps extends RequiredSome<
  DataTableProps<Patient>,
  "data"
> {}

export const PatientsTable = ({ data, ...props }: PatientsDataTableProps) => {
  const navigateOrOpen = useNavigateOrOpen();
  const user = useUser();
  const visibleColumns = useMemo(
    () =>
      user.user.type === UserType.admin ?
        columns
      : columns.filter((column) => column.id !== userColumnIds.organization),
    [user.user.type],
  );
  return (
    <DataTable
      columns={visibleColumns}
      data={data}
      entityName="patients"
      tableView={{
        onRowClick: (patient, event) =>
          void navigateOrOpen(event, {
            to: routes.patients.patient(
              patient.resourceId,
              patient.resourceType,
            ),
          }),
      }}
      {...props}
    />
  );
};
