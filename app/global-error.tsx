"use client";

import "@/app/globals.css";
import { getPostHog } from "@/providers/analytics";
import type { FC } from "react";
import { useEffect } from "react";

interface Props {
  error: Error;
}

const GlobalError: FC<Props> = (props) => {
  const { error } = props;

  useEffect(() => {
    const posthog = getPostHog();
    posthog?.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="text-lg font-medium">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          Please reload the page and try again
        </p>
      </body>
    </html>
  );
};

export default GlobalError;
