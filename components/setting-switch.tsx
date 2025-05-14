import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SwitchProps } from "@radix-ui/react-switch";
import { memo, type FC } from "react";

interface Props extends SwitchProps {
  id: string;
  label: string;
}

const SettingSwitch: FC<Props> = memo((props) => {
  const { id, label, children, ...rest } = props;
  return (
    <div className="flex items-center space-x-2">
      <Label className="w-full" htmlFor={id}>
        <p className="text-sm font-semibold">{label}</p>
        {children}
      </Label>
      <Switch id={id} {...rest} />
    </div>
  );
});

export default SettingSwitch;
