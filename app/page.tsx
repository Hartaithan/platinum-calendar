import type { FC } from "react";
import MainSection from "@/components/main-section";
import DebugOverlay from "@/components/debug-overlay";

const HomePage: FC = () => (
  <div className="flex flex-1 items-center justify-center">
    <MainSection />
    <DebugOverlay />
  </div>
);

export default HomePage;
