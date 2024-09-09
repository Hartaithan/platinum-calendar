"use client";

import { memo, type FC } from "react";
import { ModalCloseButton } from "@/components/ui/modal";
import { useErrors } from "@/providers/errors";

interface ErrorProps {
  index: number;
  error?: string | null;
}

interface ErrorListProps {
  errors: string[];
}

export const Error: FC<ErrorProps> = memo((props) => {
  const { index, error } = props;
  const { removeError } = useErrors();
  if (!error) return null;
  return (
    <div className="relative min-w-36 rounded-xl bg-background shadow-xl px-4 py-2">
      <ModalCloseButton
        className="float-none absolute top-2 right-2"
        onClick={() => removeError(index)}
      />
      <h1 className="text-xs font-medium text-red-600">Error:</h1>
      <p className="text-sm pr-5">{error ?? "Unknown error"}</p>
    </div>
  );
});

const ErrorList: FC<ErrorListProps> = memo((props) => {
  const { errors } = props;
  return (
    <div className="flex flex-col gap-2 absolute top-6 right-6 z-10">
      {errors.map((err, idx) => (
        <Error key={`${idx}-${err}`} index={idx} error={err} />
      ))}
    </div>
  );
});

export default ErrorList;
