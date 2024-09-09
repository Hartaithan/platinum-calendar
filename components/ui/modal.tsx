import type { FC, PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import IconClose from "@/icons/close";
import { cn } from "@/utils/styles";

export interface ModalState<T = null> {
  data?: T;
  isVisible: boolean;
}

export interface ModalProps<T = null> extends PropsWithChildren, ModalState<T> {
  onClose: (value: boolean) => void;
  title?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const { isVisible, title, children, onClose } = props;
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="px-4 py-3">
        <DialogHeader className="space-y-3">
          {title && (
            <DialogTitle className="w-full text-center text-sm md:text-base font-medium">
              {title}
            </DialogTitle>
          )}
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
      className={cn(
        "flex justify-center items-center p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none",
        className,
      )}
      {...rest}>
      <IconClose className="size-4" />
    </Button>
  );
};
ModalCloseButton.displayName = "ModalCloseButton";

export { Modal };
