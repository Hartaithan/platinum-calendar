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
import type { FetchSource } from "@/models/fetch";

const sourceDescription: Record<FetchSource, string> = {
  alpha:
    "more stable, but there may be issues retrieving profiles with over 1000+ platinums",
  bravo:
    "slower, but has no limitations. should only be used if you encounter issues with Alpha",
};

const SettingsForm: FC = () => {
  const { settings, handleSourceChange } = useSettings();
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1">Fetch Source</label>
      <Select value={settings.source} onValueChange={handleSourceChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select fetch source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alpha">Alpha</SelectItem>
          <SelectItem value="bravo">Bravo</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-left text-neutral-500 mt-2">
        {sourceDescription[settings.source]}
      </p>
    </div>
  );
};

export default SettingsForm;
