import { UserRoundPlus, ArrowRight } from "lucide-react";
import Button from "../../components/button";

interface InviteGuestStepProps {
  emailsToInvite: string[];
  openGuestModal: () => void;
  openConfirmTripModal: () => void;
}

export default function InviteGuestStep({
  emailsToInvite,
  openConfirmTripModal,
  openGuestModal,
}: InviteGuestStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <button
          type="button"
          onClick={openGuestModal}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1">
              {emailsToInvite.length} pessoa(s) convidadas
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1">
              Quem estará na viagem?
            </span>
          )}
        </button>
      </div>
      <div className="w-px h-6 bg-zinc-800" />
      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
