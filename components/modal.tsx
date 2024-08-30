import IconClose from "@/icons/close";
import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  container?: string;
  overlay?: string;
  header?: string;
  body?: string;
}

export type ModalOverlayProps = ComponentPropsWithoutRef<"div">;
export type ModalContainerProps = ComponentPropsWithoutRef<"div">;
export type ModalCloseButtonProps = Pick<ModalProps, "onClose"> &
  ComponentPropsWithoutRef<"button">;
export type ModalHeaderProps = Pick<ModalProps, "title" | "onClose"> &
  ComponentPropsWithoutRef<"div">;
export type ModalBodyProps = ComponentPropsWithoutRef<"div">;

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge("opacity-25 fixed inset-0 z-40 bg-black", className)}
      {...rest}
    />
  );
};

const ModalContainer: FC<ModalContainerProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <div
        className={twMerge(
          "relative w-[95%] sm:w-auto min-w-[none] sm:min-w-96 max-w-[none] sm:max-w-3xl my-6 mx-auto",
          className,
        )}
        {...rest}>
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalCloseButton: FC<ModalCloseButtonProps> = (props) => {
  const { className, onClose, ...rest } = props;
  return (
    <button
      className={twMerge(
        "flex justify-center items-center p-1 ml-auto bg-transparent border-0 text-text float-right text-3xl leading-none font-semibold outline-none focus:outline-none",
        className,
      )}
      onClick={onClose}
      {...rest}>
      <IconClose className="size-4" />
    </button>
  );
};

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { title, className, onClose, ...rest } = props;
  if (!title) return null;
  return (
    <div
      className={twMerge(
        "flex items-center justify-between px-4 pt-3 pb-2 border-b border-solid border-border/50 rounded-t",
        className,
      )}
      {...rest}>
      <h1 className="text-sm md:text-base font-semibold">{title}</h1>
      <ModalCloseButton onClose={onClose} />
    </div>
  );
};

const ModalBody: FC<ModalBodyProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={twMerge("relative px-4 py-3 flex-auto", className)}
      {...rest}>
      {children}
    </div>
  );
};

const Modal: FC<ModalProps> = (props) => {
  const {
    isVisible,
    overlay,
    container,
    header,
    body,
    title,
    onClose,
    children,
  } = props;
  if (!isVisible) return;
  return (
    <>
      <ModalOverlay className={overlay} />
      <ModalContainer className={container}>
        <ModalHeader className={header} title={title} onClose={onClose} />
        <ModalBody className={body}>{children}</ModalBody>
      </ModalContainer>
    </>
  );
};

export default Modal;
