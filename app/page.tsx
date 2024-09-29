import type { FC } from "react";
import MainSection from "@/components/main-section";
import DebugOverlay from "@/components/debug-overlay";

const HomePage: FC = () => (
  <main className="flex flex-1 items-center justify-center">
    <MainSection />
    <DebugOverlay />
  </main>
);

export default HomePage;
