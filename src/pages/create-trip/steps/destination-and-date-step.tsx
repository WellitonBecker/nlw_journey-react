import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { useState } from "react";
import HeaderModal from "../../components/headerModal";
import Modal from "../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  openGuestInput: () => void;
  closeGuestInput: () => void;
  setDestination: (destination: string) => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export default function DestinationAndDateStep({
  isGuestInputOpen,
  closeGuestInput,
  openGuestInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestInputOpen}
          placeholder="Para onde você vai?"
          onChange={(event) => setDestination(event.target.value)}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <button
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left w-[240]px"
        disabled={isGuestInputOpen}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-48">
          {displayedDate ? displayedDate : "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal size="auto">
          <HeaderModal
            closeModal={closeDatePicker}
            titleModal="Selecione a data"
          />
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
        </Modal>
      )}

      <div className="w-px h-6 bg-zinc-800" />
      {!isGuestInputOpen ? (
        <Button onClick={openGuestInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" onClick={closeGuestInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  );
}
