"use client";

import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/providers/settings";

const SettingsForm: FC = () => {
  const { settings, handleTargetChange } = useSettings();
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1">Fetch Target</label>
      <Select value={settings.target} onValueChange={handleTargetChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select fetch target" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alpha">Alpha</SelectItem>
          <SelectItem value="bravo">Bravo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsForm;
