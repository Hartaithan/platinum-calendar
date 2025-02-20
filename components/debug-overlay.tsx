"use client";

import { useDisclosure } from "@/hooks/use-disclosure";
import { useHotkeys } from "@/hooks/use-hot-keys";
import { useData } from "@/providers/data";
import { memo, type FC } from "react";

const isProduction = process.env.NODE_ENV === "production";

const DebugOverlay: FC = () => {
  const { profile, platinums, groups } = useData();
  const [visible, { toggle }] = useDisclosure();

  useHotkeys([
    ["mod+K", toggle],
    ["ctrl+K", toggle],
  ]);

  if (isProduction) return null;
  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-y-1/2 left-3 flex h-[90%] w-0 -translate-y-1/2 flex-col items-center justify-center overflow-auto xl:w-[250px]">
        <pre className="w-full whitespace-pre-wrap break-all text-[9px]">
          profile: {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
      <div className="fixed inset-y-1/2 right-3 h-[90%] w-0 -translate-y-1/2 overflow-auto xl:w-[250px]">
        <pre className="w-full whitespace-pre-wrap break-all text-[9px]">
          groups: {JSON.stringify(groups, null, 2)}
        </pre>
        <pre className="w-full whitespace-pre-wrap break-all text-[9px]">
          platinums: {JSON.stringify(platinums, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default memo(DebugOverlay);
