import type { FC } from "react";
import type { ModalProps } from "@/components/modal";
import Modal from "@/components/modal";

const SettingsModal: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  return (
    <Modal title="Settings" isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col items-center">Hello World!</div>
    </Modal>
  );
};

export default SettingsModal;
