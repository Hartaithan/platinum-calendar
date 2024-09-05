import IconClose from "@/icons/close";
import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export interface ModalStyles {
  title?: string;
  container?: string;
  overlay?: string;
  header?: string;
  body?: string;
}

export interface ModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  styles?: ModalStyles;
}

export type ModalOverlayProps = ComponentPropsWithoutRef<"div">;
export type ModalContainerProps = ComponentPropsWithoutRef<"div">;
export type ModalCloseButtonProps = Pick<ModalProps, "onClose"> &
  ComponentPropsWithoutRef<"button">;
export type ModalHeaderProps = Pick<ModalProps, "onClose"> &
  ComponentPropsWithoutRef<"div">;
export type ModalTitleProps = ComponentPropsWithoutRef<"h1">;
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
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
  const { className, onClose, children, ...rest } = props;
  return (
    <div
      className={twMerge(
        "flex items-center justify-center px-4 pt-3",
        className,
      )}
      {...rest}>
      {children}
      <ModalCloseButton
        className="float-none absolute top-3 right-3"
        onClose={onClose}
      />
    </div>
  );
};

const ModalTitle: FC<ModalTitleProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <h1
      className={twMerge("text-sm md:text-base font-medium", className)}
      {...rest}>
      {children}
    </h1>
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
  const { isVisible, title, styles, onClose, children } = props;
  useScrollLock(isVisible);
  if (!isVisible) return;
  return (
    <>
      <ModalOverlay className={styles?.overlay} />
      <ModalContainer className={styles?.container}>
        {title && (
          <ModalHeader className={styles?.header} onClose={onClose}>
            <ModalTitle className={styles?.title}>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalBody className={styles?.body}>{children}</ModalBody>
      </ModalContainer>
    </>
  );
};

export default Modal;
