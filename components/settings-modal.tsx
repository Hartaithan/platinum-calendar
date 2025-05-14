"use client";

import SettingSelect from "@/components/setting-select";
import SettingSwitch from "@/components/setting-switch";
import { Button } from "@/components/ui/button";
import type { ModalProps } from "@/components/ui/modal";
import { Modal } from "@/components/ui/modal";
import { dataKeys, dataLabels, themes, themesLabels } from "@/constants/app";
import { useModal } from "@/hooks/use-modal";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { SettingsIcon } from "lucide-react";
import { memo, useCallback, type FC } from "react";

const Content: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  const {
    settings,
    handleLeapChange,
    handleDataChange,
    handleHideChange,
    resetSettings,
  } = useSettings();
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
        <SettingSelect
          id="theme"
          label="Theme"
          placeholder="Select theme"
          options={themes}
          labels={themesLabels}
          value={theme}
          onValueChange={changeTheme}
        />
        <SettingSelect
          id="data"
          label="Data Type"
          placeholder="Select data type"
          options={dataKeys}
          labels={dataLabels}
          value={settings.data}
          onValueChange={handleDataChange}>
          <p className="mt-2 text-[11px] font-normal text-neutral-500 md:text-xs">
            select what you want to see:&nbsp;
            <b>only platinums, only 100% completions or both</b>
          </p>
        </SettingSelect>
        <SettingSwitch
          id="leap"
          label="Show Leap Day"
          checked={settings.leap}
          onCheckedChange={handleLeapChange}>
          <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
            determine whether <b>leap day</b> should be shown and included in
            progress tracking calculations for your calendar
          </p>
        </SettingSwitch>
        <SettingSwitch
          id="hide"
          label="Hide Profile"
          checked={settings.hide}
          onCheckedChange={handleHideChange}>
          <p className="mt-1 text-[11px] font-normal text-neutral-500 md:text-xs">
            enable this option to <b>blur your profile</b>, making the personal
            information visually obscured
          </p>
        </SettingSwitch>
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
