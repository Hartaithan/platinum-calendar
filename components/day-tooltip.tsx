import type { PropsWithChildren } from "react";
import { memo, type FC } from "react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props extends PropsWithChildren {
  label: string;
}

const DayTooltip: FC<Props> = memo((props) => {
  const { label, children } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        {children}
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default DayTooltip;
