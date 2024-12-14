"use client";

import type { FC } from "react";
import { Modal } from "@/components/ui/modal";
import type { ModalProps } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/providers/settings";
import type { FetchSource } from "@/models/fetch";
import { themes, themesLabels } from "@/constants/app";
import { useTheme } from "@/providers/theme";
import { useSearchParams } from "next/navigation";
import { fetchSourceOptions } from "@/constants/fetch";

const sourceDescription: Record<FetchSource, string> = {
  alpha:
    "more stable, but may encounter issues retrieving profiles with over 1000+ platinums",
  bravo:
    "slower, but without limitations. use only if you experience issues with Alpha",
  charlie:
    "backup source, has a monthly quota. might not be available by the end of the month",
};

const SettingsModal: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  const {
    settings,
    handleSourceChange,
    handleLinkChange,
    handleLeapChange,
    resetSettings,
  } = useSettings();
  const { theme, changeTheme } = useTheme();
  const searchParams = useSearchParams();

  const isDev = searchParams.get("dev") !== null;

  return (
    <Modal
      title="Settings"
      description="Settings modal"
      isVisible={isVisible}
      onClose={onClose}>
      <div className="flex flex-col space-y-4">
        {isDev && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="link" className="w-full">
              <p className="text-sm font-semibold">Show Link on Image</p>
              <p className="text-[11px] md:text-xs font-normal text-neutral-500 mt-1">
                determine whether a link should be displayed in the generated
                image
              </p>
            </Label>
            <Switch
              id="link"
              checked={settings.link}
              onCheckedChange={handleLinkChange}
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Label htmlFor="link" className="w-full">
            <p className="text-sm font-semibold">Show Leap Day</p>
            <p className="text-[11px] md:text-xs font-normal text-neutral-500 mt-1">
              determine whether the leap day should be shown and included in
              progress tracking calculations for your calendar
            </p>
          </Label>
          <Switch
            id="link"
            checked={settings.leap}
            onCheckedChange={handleLeapChange}
          />
        </div>
        <div className="flex flex-col">
          <Label className="text-sm font-semibold mb-1">Theme</Label>
          <Select value={theme} onValueChange={changeTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {themesLabels[theme]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label className="text-sm font-semibold mb-1">Fetch Source</Label>
          <Select value={settings.source} onValueChange={handleSourceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select fetch source" />
            </SelectTrigger>
            <SelectContent>
              {fetchSourceOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] md:text-xs text-neutral-500 mt-2">
            {sourceDescription[settings.source]}
          </p>
        </div>
        <Button aria-label="Reset settings" onClick={resetSettings}>
          Reset settings
        </Button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
