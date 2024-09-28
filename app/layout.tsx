import "@/app/globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";
import RootProviders from "@/providers/root";
import { Toaster } from "@/components/ui/sonner";
import { getTheme } from "@/actions/theme";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Platinum Calendar",
  description: "Platinum Calendar Generator",
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
