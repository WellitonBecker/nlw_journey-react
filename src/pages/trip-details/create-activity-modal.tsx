import { Tag, Calendar } from "lucide-react";
import Button from "../components/button";
import Modal from "../components/modal";
import HeaderModal from "../components/headerModal";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModel: () => void;
}

export default function CreateActivityModal({
  closeCreateActivityModel,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    closeCreateActivityModel();
  }

  return (
    <Modal>
      <HeaderModal
        closeModal={closeCreateActivityModel}
        titleModal="Cadastrar atividade"
      >
        Todos convidados podem visualizar as atividades.
      </HeaderModal>

      <form onSubmit={createActivity} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            type="text"
            name="title"
            required
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Calendar className="text-zinc-400 size-5" />
          <input
            type="datetime-local"
            name="occurs_at"
            required
            placeholder="Data e horário da atividade"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <Button type="submit" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
