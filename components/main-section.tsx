"use client";

import AboutModal from "@/components/about-modal";
import Calendar from "@/components/calendar";
import SettingsModal from "@/components/settings-modal";
import ShareMenu from "@/components/share-menu";
import SubmitForm from "@/components/submit-form";
import YearFilter from "@/components/year-filter";
import type { FC } from "react";

const MainSection: FC = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex w-4/5 flex-col items-center gap-2 lg:w-auto lg:flex-row">
      <SubmitForm />
      <div className="flex h-auto w-full flex-wrap gap-2 lg:h-9 lg:w-[auto] [&>*]:flex-1">
        <YearFilter />
        <ShareMenu />
        <AboutModal />
        <SettingsModal />
      </div>
    </div>
    <Calendar />
  </div>
);

export default MainSection;
