//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { Tooltip } from "@stanfordspezi/spezi-web-design-system/components/Tooltip";
import { Download } from "lucide-react";
import { type ResourceType } from "@/modules/firebase/utils";
import { useDownloadPatientData } from "@/modules/user/patients";

interface ExportUserDataProps {
  userId: string;
  userName: string;
  resourceType: ResourceType;
}

export const ExportUserData = ({
  userId,
  resourceType,
  userName,
}: ExportUserDataProps) => {
  const downloadPatientData = useDownloadPatientData();

  return (
    <Tooltip
      open={resourceType === "invitation" ? undefined : false}
      tooltip="This user has not logged in to the application yet"
    >
      <Button
        type="submit"
        variant="secondary"
        disabled={resourceType === "invitation"}
        onClick={() => downloadPatientData.mutateAsync({ userId, userName })}
        className="disabled:pointer-events-auto"
        isPending={downloadPatientData.isPending}
      >
        <Download />
        Export Data
      </Button>
    </Tooltip>
  );
};
