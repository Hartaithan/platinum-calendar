import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";
import RootProviders from "@/providers/root";
import "@/app/globals.css";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Platinum Calendar",
  description: "Platinum Calendar Generator",
};

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="og">
      <body className={font.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
};

export default MainLayout;
