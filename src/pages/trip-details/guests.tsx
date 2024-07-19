import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import Button from "../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import CreateInviteModal from "./create-invite-modal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export default function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isCreateInviteModalOpen, setIsCreateInviteModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block font-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400" />
              )}
            </div>
          );
        })}
      </div>
      <Button
        size="full"
        variant="secondary"
        onClick={() => setIsCreateInviteModalOpen(true)}
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
      {isCreateInviteModalOpen && (
        <CreateInviteModal
          closeCreateInviteModal={() => setIsCreateInviteModalOpen(false)}
        />
      )}
    </div>
  );
}
