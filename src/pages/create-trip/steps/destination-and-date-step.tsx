import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../components/button";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  openGuestInput: () => void;
  closeGuestInput: () => void;
}

export default function DestinationAndDateStep({
  isGuestInputOpen,
  closeGuestInput,
  openGuestInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInputOpen}
          type="text"
          placeholder="Quando"
          className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none"
        />
      </div>
      <div className="w-px h-6 bg-zinc-800" />
      {!isGuestInputOpen ? (
        <Button
          onClick={openGuestInput}
        >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={closeGuestInput}
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  );
}
