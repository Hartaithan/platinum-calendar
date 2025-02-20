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
import { useFetchSources } from "@/hooks/use-fetch-sources";
import { useModal } from "@/hooks/use-modal";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { SettingsIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, type FC } from "react";

const Content: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  const {
    settings,
    handleSourceChange,
    handleLinkChange,
    handleLeapChange,
    resetSettings,
  } = useSettings();
  const searchParams = useSearchParams();
  const { theme, changeTheme } = useTheme();
  const { isLoading, options, optionsRef, descriptions, fetchSources } =
    useFetchSources();

  const isDev = searchParams.get("dev") !== null;

  useEffect(() => {
    if (!isVisible) return;
    if (optionsRef.current.length > 0) return;
    fetchSources();
  }, [isVisible, optionsRef, fetchSources]);

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
              <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
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
            <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
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
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-semibold">Fetch Source</Label>
          <Select
            defaultValue="not-found"
            value={settings.source}
            onValueChange={handleSourceChange}>
            {isLoading && <SelectTrigger>Loading...</SelectTrigger>}
            {!isLoading && (
              <SelectTrigger>
                <SelectValue placeholder="Select fetch source" />
              </SelectTrigger>
            )}
            {!isLoading && (
              <SelectContent>
                {options.length === 0 && (
                  <SelectItem value={settings.source} disabled>
                    Nothing found :(
                  </SelectItem>
                )}
                {options.length > 0 &&
                  options.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectContent>
            )}
          </Select>
          <p className="mt-2 text-[11px] text-neutral-500 md:text-xs">
            {isLoading && "loading..."}
            {!isLoading && descriptions && descriptions[settings.source]}
          </p>
        </div>
        <Button aria-label="Reset settings" onClick={resetSettings}>
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
