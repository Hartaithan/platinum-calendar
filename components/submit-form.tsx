import type { ComponentPropsWithoutRef, FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon } from "lucide-react";

type Props = ComponentPropsWithoutRef<"form">;

const SubmitForm: FC<Props> = (props) => {
  const { onSubmit } = props;
  return (
    <form
      className="relative flex w-full max-w-sm items-center space-x-2"
      onSubmit={onSubmit}>
      <Input
        name="id"
        className="w-full lg:w-96 h-9 pr-8"
        placeholder="Enter your PSN ID"
      />
      <Button
        type="submit"
        className="h-full absolute right-0 !ml-0 hover:opacity-80 px-2"
        variant="unstyled">
        <SendHorizontalIcon className="size-5 stroke-1" />
      </Button>
    </form>
  );
};

export default SubmitForm;
