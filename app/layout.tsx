import { getTheme } from "@/actions/theme";
import "@/app/globals.css";
import CrossServiceLink from "@/components/cross-service-link";
import { Toaster } from "@/components/ui/sonner";
import { APP_URL } from "@/constants/variables";
import RootProviders from "@/providers/root";
import { detectBrowser, getDeviceType } from "@/utils/device-server";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Platinum Calendar",
  description: "Generate a calendar of your PlayStation platinum trophies",
  applicationName: "Platinum Calendar",
  twitter: { card: "summary_large_image" },
  keywords: [
    "calendar",
    "platinum calendar",
    "trophy calendar",
    "infographic",
    "gaming infographic",
    "trophy infographic",
    "trophy",
    "trophies",
    "rare trophies",
    "trophy tracking",
    "gaming",
    "platinum",
    "playstation",
    "playstation trophies",
    "trophy hunting",
    "psn trophies",
    "ps5 platinum",
    "ps4 platinum",
    "trophy goals",
    "platinum goals",
    "trophy milestones",
    "platinum milestones",
    "psn profile",
    "trophy list",
    "platinum list",
    "trophy generator",
    "platinum generator",
    "platinum timeline",
    "trophy stats",
    "platinum stats",
  ],
  robots: "all",
  metadataBase: new URL(APP_URL),
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
  const theme = await getTheme();
  const browser = detectBrowser();
  const device = getDeviceType();
  return (
    <html
      lang="en"
      data-theme={theme}
      data-device={device}
      data-browser={browser}>
      <body className={font.className}>
        <RootProviders defaultTheme={theme}>{children}</RootProviders>
        <Toaster theme="light" position="top-right" richColors closeButton />
        <CrossServiceLink />
      </body>
    </html>
  );
};

export default MainLayout;
