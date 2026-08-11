//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { Tooltip } from "@stanfordspezi/spezi-web-design-system/components/Tooltip";
import { FileUser } from "lucide-react";
import { type ResourceType } from "@/modules/firebase/utils";
import { useDownloadPatientHealthSummary } from "@/modules/user/patients";

interface GenerateHealthSummaryProps {
  userId: string;
  userName: string;
  resourceType: ResourceType;
}

export const GenerateHealthSummary = ({
  userId,
  resourceType,
  userName,
}: GenerateHealthSummaryProps) => {
  const downloadHealthSummary = useDownloadPatientHealthSummary();

  return (
    <Tooltip
      open={resourceType === "invitation" ? undefined : false}
      tooltip="This user has not logged in to the application yet"
    >
      <Button
        type="submit"
        variant="secondary"
        disabled={resourceType === "invitation"}
        onClick={() => downloadHealthSummary.mutateAsync({ userId, userName })}
        className="disabled:pointer-events-auto"
        isPending={downloadHealthSummary.isPending}
      >
        <FileUser />
        Export Health Summary
      </Button>
    </Tooltip>
  );
};
