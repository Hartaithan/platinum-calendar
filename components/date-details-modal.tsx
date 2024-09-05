import type { FC } from "react";
import Modal from "@/components/modal";
import type { ModalProps, ModalStyles } from "@/components/modal";
import type { DateDetails } from "@/models/calendar";
import { getDateLabel } from "@/utils/date";
import PlatinumItem from "@/components/platinum-item";

export interface DateDetailsState {
  isVisible: boolean;
  details: DateDetails | null;
}

export interface DateDetailsProps extends ModalProps {
  details: DateDetails | null;
}

const modalStyles: ModalStyles = {
  container: "min-w-[none] sm:min-w-[512px]",
};

const DateDetailsModal: FC<DateDetailsProps> = (props) => {
  const { isVisible, details, onClose } = props;
  const label = details?.date ? getDateLabel(details.date) : "Details";
  return (
    <Modal
      title={label}
      isVisible={isVisible}
      onClose={onClose}
      styles={modalStyles}>
      <div className="flex flex-col items-center">
        {details?.platinums && (
          <div className="w-full-scrollbar flex flex-col gap-3 max-h-[80vh] overflow-y-auto scrollbar-gutter">
            {details.platinums.map((plat) => (
              <PlatinumItem key={plat} platKey={plat} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DateDetailsModal;
