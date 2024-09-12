"use client";

import { useCallback, type FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FetchTarget } from "@/models/fetch";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface Form {
  fetch: FetchTarget;
}

const defaultValue: Form = {
  fetch: "alpha",
};

const SettingsForm: FC = () => {
  const [settings, setSettings] = useLocalStorage<Form>({
    key: "plat-cal-settings",
    defaultValue,
  });

  const handleFetchChange = useCallback(
    (value: FetchTarget) => {
      setSettings((prev) => ({ ...prev, fetch: value }));
    },
    [setSettings],
  );

  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1">Fetch Target</label>
      <Select value={settings.fetch} onValueChange={handleFetchChange}>
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
