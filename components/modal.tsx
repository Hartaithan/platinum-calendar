import IconClose from "@/icons/close";
import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export type ModalContainerProps = PropsWithChildren;
export type ModalCloseButtonProps = Pick<ModalProps, "onClose"> &
  ComponentPropsWithoutRef<"button">;
export type ModalHeaderProps = Pick<ModalProps, "title" | "onClose">;
export type ModalBodyProps = PropsWithChildren;

const ModalOverlay: FC = () => {
  return <div className="opacity-25 fixed inset-0 z-40 bg-black" />;
};

const ModalContainer: FC<ModalContainerProps> = (props) => {
  const { children } = props;
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto min-w-96 max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalCloseButton: FC<ModalCloseButtonProps> = (props) => {
  const { className, onClose } = props;
  return (
    <button
      className={twMerge(
        "flex justify-center items-center p-1 ml-auto bg-transparent border-0 text-text float-right text-3xl leading-none font-semibold outline-none focus:outline-none",
        className,
      )}
      onClick={onClose}>
      <IconClose className="size-4" />
    </button>
  );
};

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { title, onClose } = props;
  if (!title) return null;
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-solid border-border/50 rounded-t">
      <h1 className="text-md font-semibold">{title}</h1>
      <ModalCloseButton onClose={onClose} />
    </div>
  );
};

const ModalBody: FC<ModalBodyProps> = (props) => {
  const { children } = props;
  return <div className="relative px-4 py-3 flex-auto">{children}</div>;
};

const Modal: FC<ModalProps> = (props) => {
  const { isVisible, children } = props;
  if (!isVisible) return;
  return (
    <>
      <ModalOverlay />
      <ModalContainer>
        <ModalHeader {...props} />
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </>
  );
};

export default Modal;
