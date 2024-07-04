"use client";

import type { FormEventHandler } from "react";
import { useCallback, type FC } from "react";

interface Form {
  id: { value: string };
}

const MainSection: FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & Form;
    const id = target.id.value;
    const form = { id };
    console.info("form :>> ", form);
  }, []);

  return (
    <form className="w-80" onSubmit={handleSubmit}>
      <input
        name="id"
        className="block w-full text-sm rounded-md py-2 pl-4 ring-1 ring-inset bg-zinc-900 ring-zinc-800 placeholder:text-zinc-600 focus:ring-1 focus:ring-inset focus:ring-zinc-600"
        placeholder="Enter your PSN ID"
      />
    </form>
  );
};

export default MainSection;
