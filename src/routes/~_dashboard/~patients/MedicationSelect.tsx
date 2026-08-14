//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@schmiedmayerlab/grove-design-system/components/Select";
import { type ComponentProps } from "react";
import { parseLocalizedText } from "@/modules/firebase/localizedText";
import { type MedicationsData } from "@/routes/~_dashboard/~patients/utils";

interface MedicationSelectProps
  extends MedicationsData, Omit<ComponentProps<typeof Select>, "children"> {}

export const MedicationSelect = ({
  medications,
  ...props
}: MedicationSelectProps) => (
  <Select search {...props}>
    <SelectTrigger>
      <SelectValue placeholder="Medication" />
    </SelectTrigger>
    <SelectContent>
      {medications.map((medicationClass) => (
        <SelectGroup
          key={medicationClass.id}
          heading={parseLocalizedText(medicationClass.name)}
        >
          {medicationClass.medications.map((medication) => (
            <SelectItem value={medication.id} key={medication.id}>
              {medication.name}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </SelectContent>
  </Select>
);
