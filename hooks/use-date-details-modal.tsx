import type { DetailsModalData } from "@/components/date-details-modal";
import DateDetailsModal from "@/components/date-details-modal";
import { useModal } from "@/hooks/use-modal";
import type { DayClickHandler } from "@/models/calendar";
import { useCallback, useMemo } from "react";

export const useDateDetailsModal = () => {
  const [details, openDetails, closeDetails] = useModal<DetailsModalData>();

  const handleDayClick: DayClickHandler = useCallback(
    (details) => openDetails(details),
    [openDetails],
  );

  const modal = useMemo(
    () => (
      <DateDetailsModal
        data={details.data}
        isVisible={details.isVisible}
        onClose={closeDetails}
      />
    ),
    [details.data, details.isVisible, closeDetails],
  );

  return { handleDayClick, modal };
};
