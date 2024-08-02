import type { FC } from "react";
import Modal from "@/components/modal";
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
    <Modal title="Date Details" isVisible={isVisible} onClose={onClose}>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </Modal>
  );
};

export default DateDetailsModal;
