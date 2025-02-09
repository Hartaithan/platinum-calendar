"use client";

import { toast } from "sonner";

export const showExpiresToast = (expires: string | null) => {
  if (!expires) return;
  const expiration = new Date(expires);
  toast.warning("You are viewing cached data", {
    description: `Fresh data will be available after ${expiration.toLocaleString()}`,
    duration: Infinity,
  });
};
