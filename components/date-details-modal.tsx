import type { FC } from "react";
import Modal, { ModalCloseButton } from "@/components/modal";
import type { ModalProps } from "@/components/modal";
import type { DateDetails } from "@/models/calendar";

export interface DateDetailsState {
  isVisible: boolean;
  details: DateDetails | null;
}

export interface DateDetailsProps extends ModalProps {
  details: DateDetails | null;
}

const DateDetailsModal: FC<DateDetailsProps> = (props) => {
  const { isVisible, details, onClose } = props;
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ModalCloseButton
        className="float-none absolute top-3 right-3"
        onClose={onClose}
      />
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </Modal>
  );
};

export default DateDetailsModal;
