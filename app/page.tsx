import DebugOverlay from "@/components/debug-overlay";
import MainSection from "@/components/main-section";
import type { FC } from "react";

const HomePage: FC = () => (
  <main className="flex flex-1 items-center justify-center">
    <MainSection />
    <DebugOverlay />
  </main>
);

export default HomePage;
