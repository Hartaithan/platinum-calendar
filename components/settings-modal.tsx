"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ModalProps } from "@/components/ui/modal";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { themes, themesLabels } from "@/constants/app";
import { useModal } from "@/hooks/use-modal";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { SettingsIcon } from "lucide-react";
import { memo, useCallback, type FC } from "react";

const Content: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  const { settings, handleLeapChange, handleCompletesChange, resetSettings } =
    useSettings();
  const { theme, changeTheme, resetTheme } = useTheme();

  const handleReset = useCallback(() => {
    resetSettings();
    resetTheme();
  }, [resetSettings, resetTheme]);

  return (
    <Modal
      title="Settings"
      description="Settings modal"
      isVisible={isVisible}
      onClose={onClose}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-semibold">Theme</Label>
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
        <div className="flex items-center space-x-2">
          <Label htmlFor="leap" className="w-full">
            <p className="text-sm font-semibold">Show Leap Day</p>
            <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
              determine whether <b>leap day</b> should be shown and included in
              progress tracking calculations for your calendar
            </p>
          </Label>
          <Switch
            id="leap"
            checked={settings.leap}
            onCheckedChange={handleLeapChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="completes" className="w-full">
            <p className="text-sm font-semibold">Show Completes</p>
            <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
              determine whether <b>completes</b> should be shown and included in
              progress tracking calculations for your calendar.
            </p>
          </Label>
          <Switch
            id="completes"
            checked={settings.completes}
            onCheckedChange={handleCompletesChange}
          />
        </div>
        <Button aria-label="Reset settings" onClick={handleReset}>
          Reset settings
        </Button>
      </div>
    </Modal>
  );
};

const SettingsModal = memo(() => {
  const [settings, openSettings, closeSettings] = useModal();
  return (
    <>
      <Content isVisible={settings.isVisible} onClose={closeSettings} />
      <Button
        id="settings-modal"
        variant="secondary"
        aria-label="Open settings"
        className="border border-input"
        onClick={openSettings}>
        <SettingsIcon className="size-5 stroke-[1.5]" />
      </Button>
    </>
  );
});

export default SettingsModal;
