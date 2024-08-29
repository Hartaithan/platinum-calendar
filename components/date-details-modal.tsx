import type { FC } from "react";
import Modal, { ModalCloseButton } from "@/components/modal";
import type { ModalProps } from "@/components/modal";
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

const DateDetailsModal: FC<DateDetailsProps> = (props) => {
  const { isVisible, details, onClose } = props;
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      container="min-w-[none] sm:min-w-[512px]">
      <ModalCloseButton
        className="float-none absolute top-3 right-3"
        onClose={onClose}
      />
      <div className="flex flex-col items-center">
        {details?.date && (
          <h1 className="text-sm md:text-base">{getDateLabel(details.date)}</h1>
        )}
        {details?.platinums && (
          <div className="w-full-scrollbar flex flex-col gap-3 mt-3 max-h-[80vh] overflow-y-auto scrollbar-gutter">
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
