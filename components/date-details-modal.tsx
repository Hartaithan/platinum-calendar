import type { FC } from "react";
import { Modal } from "@/components/ui/modal";
import type { ModalProps } from "@/components/ui/modal";
import type { DateDetails } from "@/models/calendar";
import { getDateLabelWithCount } from "@/utils/date";
import PlatinumList from "@/components/platinum-list";

export type DetailsModalData = DateDetails | null;

const DateDetailsModal: FC<ModalProps<DetailsModalData>> = (props) => {
  const { isVisible, data, onClose } = props;
  const label = data
    ? getDateLabelWithCount({ date: data?.date }, data?.platinums?.length)
    : "Details";
  return (
    <Modal
      title={label}
      description="Date details modal"
      isVisible={isVisible}
      onClose={onClose}>
      <div className="flex flex-col items-center">
        <PlatinumList data={data?.platinums} />
      </div>
    </Modal>
  );
};

export default DateDetailsModal;
