import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";
import RootProviders from "@/providers/root";
import { Toaster } from "@/components/ui/sonner";
import { getTheme } from "@/actions/theme";
import { URL as BASE_URL } from "@/constants/variables";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Platinum Calendar",
  description: "Generate a calendar of your PlayStation platinum trophies",
  applicationName: "Platinum Calendar",
  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: {
    title: "Platinum Calendar",
  },
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
  metadataBase: new URL(BASE_URL),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
  const defaultTheme = await getTheme();
  return (
    <html lang="en" data-theme={defaultTheme}>
      <body className={font.className}>
        <RootProviders defaultTheme={defaultTheme}>{children}</RootProviders>
        <Toaster theme="light" position="top-right" richColors closeButton />
      </body>
    </html>
  );
};

export default MainLayout;
