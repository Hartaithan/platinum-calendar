import IconClose from "@/icons/close";
import type { FC, PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export type ModalContainerProps = PropsWithChildren;
export type ModalCloseButtonProps = Pick<ModalProps, "onClose">;
export type ModalHeaderProps = Pick<ModalProps, "title" | "onClose">;
export type ModalBodyProps = PropsWithChildren;

const ModalOverlay: FC = () => {
  return <div className="opacity-25 fixed inset-0 z-40 bg-black" />;
};

const ModalContainer: FC<ModalContainerProps> = (props) => {
  const { children } = props;
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto min-w-96 max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalCloseButton: FC<ModalCloseButtonProps> = (props) => {
  const { onClose } = props;
  return (
    <button
      className="flex justify-center items-center p-1 ml-auto bg-transparent border-0 text-text float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
  const { children } = props;
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
