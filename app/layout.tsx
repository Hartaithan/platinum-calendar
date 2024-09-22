import "@/app/globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";
import RootProviders from "@/providers/root";
import { Toaster } from "@/components/ui/sonner";
import { defaultTheme } from "@/constants/app";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Platinum Calendar",
  description: "Platinum Calendar Generator",
};

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <RootProviders defaultTheme={defaultTheme}>{children}</RootProviders>
        <Toaster theme="light" position="top-right" richColors closeButton />
      </body>
    </html>
  );
};

export default MainLayout;
