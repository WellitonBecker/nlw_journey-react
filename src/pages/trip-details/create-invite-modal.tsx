import { AtSign } from "lucide-react";
import Button from "../components/button";
import Modal from "../components/modal";
import HeaderModal from "../components/headerModal";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

interface CreateInviteModalProps {
  closeCreateInviteModal: () => void;
}

export default function CreateInviteModal({
  closeCreateInviteModal,
}: CreateInviteModalProps) {
  const { tripId } = useParams();
  const navigate = useNavigate();

  async function createInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    await api.post(`/trips/${tripId}/invite`, {
      email,
    });

    closeCreateInviteModal();
    navigate(0);
  }

  return (
    <Modal>
      <HeaderModal
        closeModal={closeCreateInviteModal}
        titleModal="Cadastrar convidado"
      />

      <form onSubmit={createInvite} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            required
            placeholder="Qual o email do convidado?"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <Button type="submit" size="full">
          Salvar convidado
        </Button>
      </form>
    </Modal>
  );
}
