import type { FC } from "react";
import { Modal } from "@/components/ui/modal";
import type { ModalProps } from "@/components/ui/modal";
import SettingsForm from "@/components/settings-form";

const SettingsModal: FC<ModalProps> = (props) => {
  const { isVisible, onClose } = props;
  return (
    <Modal
      title="Settings"
      description="Settings modal"
      isVisible={isVisible}
      onClose={onClose}>
      <SettingsForm />
    </Modal>
  );
};

export default SettingsModal;
