"use client";

import AboutModal from "@/components/about-modal";
import Calendar from "@/components/calendar";
import DataLoadingPopup from "@/components/data-loading-popup";
import LinkMessage from "@/components/link-message";
import Profile from "@/components/profile";
import SettingsModal from "@/components/settings-modal";
import ShareMenu from "@/components/share-menu";
import SubmitForm from "@/components/submit-form";
import YearFilter from "@/components/year-filter";
import { useCalendarCapture } from "@/hooks/use-calendar-capture";
import { useCalendarSubmit } from "@/hooks/use-calendar-submit";
import type { FC } from "react";

const MainSection: FC = () => {
  const { popupRef, submit, abort } = useCalendarSubmit();
  const { calendarRef, hiddenRef, capture } = useCalendarCapture();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-4/5 flex-col items-center gap-2 lg:w-auto lg:flex-row">
        <SubmitForm onSubmit={submit} />
        <div className="flex h-auto w-full flex-wrap gap-2 lg:h-9 lg:w-[auto] [&>*]:flex-1">
          <YearFilter />
          <ShareMenu generateImage={capture} />
          <AboutModal />
          <SettingsModal />
        </div>
      </div>
      <div
        className="relative flex flex-grow flex-col items-center px-10 py-9"
        ref={calendarRef}>
        <Profile />
        <Calendar />
        <LinkMessage />
      </div>
      <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
        <div
          className="flex h-[800px] w-[1200px] flex-col @container"
          ref={hiddenRef}
        />
      </div>
      <DataLoadingPopup ref={popupRef} handleAbort={abort} />
    </div>
  );
};

export default MainSection;
