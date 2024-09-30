import { Spinner } from "@/components/ui/spinner";
import type { FC } from "react";

const RedirectPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-10">
      <Spinner className="size-10 md:size-12" />
      <h1 className="text-xl md:text-2xl font-semibold text-center mt-2">
        Please wait
      </h1>
      <p className="text-muted-foreground text-center mt-1">
        You will be redirected to an external page shortly...
      </p>
    </div>
  );
};

export default RedirectPage;
