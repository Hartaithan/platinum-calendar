"use client";

import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/providers/settings";
import type { FetchSource } from "@/models/fetch";

const sourceDescription: Record<FetchSource, string> = {
  alpha:
    "more stable, but may encounter issues retrieving profiles with over 1000+ platinums",
  bravo:
    "slower, but without limitations. use only if you experience issues with Alpha",
};

const SettingsForm: FC = () => {
  const { settings, handleSourceChange, handleLinkChange } = useSettings();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="link" className="w-full">
          <Label>Show Link on Image</Label>
          <p className="text-[11px] md:text-xs font-normal text-neutral-500 mt-1">
            determine whether a link should be displayed on top of the image
          </p>
        </Label>
        <Switch
          id="link"
          checked={settings.link}
          onCheckedChange={handleLinkChange}
        />
      </div>
      <div className="flex flex-col">
        <Label className="text-sm font-semibold mb-1">Fetch Source</Label>
        <Select value={settings.source} onValueChange={handleSourceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select fetch source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alpha">Alpha</SelectItem>
            <SelectItem value="bravo">Bravo</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-[11px] md:text-xs text-neutral-500 mt-2">
          {sourceDescription[settings.source]}
        </p>
      </div>
    </div>
  );
};

export default SettingsForm;
