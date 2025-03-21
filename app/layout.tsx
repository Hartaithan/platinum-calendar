import { getTheme } from "@/actions/theme";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { APP_URL } from "@/constants/variables";
import RootProviders from "@/providers/root";
import { detectBrowser } from "@/utils/device-server";
import type { Metadata, Viewport } from "next";
// import dynamic from "next/dynamic";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";

// const Promo = dynamic(() => import("@/components/promo"), { ssr: false });

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
  const defaultTheme = await getTheme();
  const browser = detectBrowser();
  return (
    <html lang="en" data-theme={defaultTheme} data-browser={browser}>
      <body className={font.className}>
        <RootProviders defaultTheme={defaultTheme}>{children}</RootProviders>
        <Toaster theme="light" position="top-right" richColors closeButton />
        {/* <Promo /> */}
      </body>
    </html>
  );
};

export default MainLayout;
