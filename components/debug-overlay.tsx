"use client";

import { useData } from "@/providers/data";
import { memo, type FC } from "react";

const isProduction = process.env.NODE_ENV === "production";

const DebugOverlay: FC = memo(() => {
  const { profile, platinums, groups } = useData();
  if (isProduction) return null;
  return (
    <>
      <div className="w-[250px] absolute inset-y-1/2 -translate-y-1/2 left-3 overflow-auto h-[90%] flex flex-col justify-center items-center">
        <pre className="w-full text-[9px] whitespace-pre-wrap break-all">
          profile: {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
      <div className="w-[250px] absolute inset-y-1/2 -translate-y-1/2 right-3 overflow-auto h-[90%]">
        <pre className="w-full text-[9px] whitespace-pre-wrap break-all">
          groups: {JSON.stringify(groups, null, 2)}
        </pre>
        <pre className="w-full text-[9px] whitespace-pre-wrap break-all">
          platinums: {JSON.stringify(platinums, null, 2)}
        </pre>
      </div>
    </>
  );
});

export default DebugOverlay;
