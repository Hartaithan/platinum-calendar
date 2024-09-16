import type { FC, PropsWithChildren } from "react";
import {
  Dialog,
  DialogCloseStyles,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/utils/styles";

export interface ModalState<T = null> {
  data?: T;
  isVisible: boolean;
}

export interface ModalProps<T = null> extends PropsWithChildren, ModalState<T> {
  onClose: (value: boolean) => void;
  title?: string;
  description?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const { isVisible, title, description, children, onClose } = props;
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="px-4 py-3 w-[calc(100%-1.5rem)] md:w-full rounded-lg">
        <DialogHeader className="space-y-3">
          {title && (
            <DialogTitle className="w-full text-center text-sm md:text-base font-medium">
              {title}
            </DialogTitle>
          )}
          <DialogDescription className="hidden">
            {description ?? "Modal"}
          </DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
Modal.displayName = "Modal";

export const ModalCloseButton: FC<ButtonProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <Button
      variant="unstyled"
      className={cn(DialogCloseStyles.button, className)}
      {...rest}>
      <XIcon className={DialogCloseStyles.icon} />
      <span className={DialogCloseStyles.sr}>Close</span>
    </Button>
  );
};
ModalCloseButton.displayName = "ModalCloseButton";

export { Modal };
