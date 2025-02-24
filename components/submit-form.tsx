"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/providers/data";
import SubmitProvider, { useSubmit } from "@/providers/submit";
import { SendHorizontalIcon } from "lucide-react";
import type { FC } from "react";

const SubmitForm: FC = () => {
  const { onSubmit } = useSubmit();
  const { status } = useData();
  const isLoading =
    status === "platinums-loading" || status === "profile-loading";
  return (
    <form
      className="relative flex w-full max-w-[auto] items-center space-x-2 lg:max-w-sm"
      onSubmit={onSubmit}>
      <Input
        name="id"
        className="h-9 w-full bg-secondary pr-8 lg:w-96"
        placeholder="Enter your PSN ID"
        disabled={isLoading}
      />
      <Button
        unstyled
        aria-label="Submit"
        className="absolute right-0 !ml-0 h-full px-2 hover:opacity-80"
        type="submit"
        disabled={isLoading}>
        <SendHorizontalIcon className="size-5 stroke-1" />
      </Button>
    </form>
  );
};

const Wrapper: FC = () => (
  <SubmitProvider>
    <SubmitForm />
  </SubmitProvider>
);

export default Wrapper;
