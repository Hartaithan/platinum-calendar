import HeatMapCalendar from "@/components/heatmap-calendar";
import LinkMessage from "@/components/link-message";
import OGCalendar from "@/components/og-calendar";
import Profile from "@/components/profile";
import { defaultTheme } from "@/constants/app";
import type { Theme } from "@/models/app";
import { useCapture } from "@/providers/capture";
import { useTheme } from "@/providers/theme";
import type { FC } from "react";

const calendars: Record<Theme, FC> = {
  og: OGCalendar,
  heatmap: HeatMapCalendar,
};

const PickedCalendar: FC = () => {
  const { theme } = useTheme();
  const Picked = calendars[theme || defaultTheme];
  return <Picked />;
};

const Calendar: FC = () => {
  const { captureRef } = useCapture();
  return (
    <div
      className="relative flex flex-grow flex-col items-center px-10 py-9"
      ref={captureRef}>
      <Profile />
      <PickedCalendar />
      <LinkMessage />
    </div>
  );
};

export default Calendar;
