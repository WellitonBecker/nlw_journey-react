import { MapPin, Calendar } from "lucide-react";
import Button from "../components/button";
import Modal from "../components/modal";
import HeaderModal from "../components/headerModal";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
  trip: Trip;
}

export default function UpdateTripModal({
  closeUpdateTripModal,
  trip,
}: UpdateTripModalProps) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(trip.destination);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >({ from: new Date(trip.starts_at), to: new Date(trip.ends_at) });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    await api.put(`/trips/${trip.id}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    });

    closeUpdateTripModal();
    navigate(0);
  }

  return (
    <Modal>
      <HeaderModal
        closeModal={closeUpdateTripModal}
        titleModal="Alterar viagem"
      ></HeaderModal>

      <form onSubmit={createLink} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Para onde você vai?"
            defaultValue={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>
        <div className="h-14 px-4 flex bg-zinc-950 border border-zinc-800 rounded-lg justify-start gap-2">
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="flex-1 flex items-center gap-2"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400">
              {displayedDate ? displayedDate : "Quando?"}
            </span>
          </button>
        </div>

        {isDatePickerOpen && (
          <Modal size="auto">
            <HeaderModal
              closeModal={() => setIsDatePickerOpen(false)}
              titleModal="Selecione a data"
            />
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </Modal>
        )}

        <Button type="submit" size="full">
          Alterar viagem
        </Button>
      </form>
    </Modal>
  );
}
