import { Link2, Link } from "lucide-react";
import Button from "../components/button";
import Modal from "../components/modal";
import HeaderModal from "../components/headerModal";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateActivityModel: () => void;
}

export default function CreateLinkModal({
  closeCreateActivityModel: closeCreateLinkModel,
}: CreateLinkModalProps) {
  const { tripId } = useParams();
  const navigate = useNavigate();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    closeCreateLinkModel();
    navigate(0);
  }

  return (
    <Modal>
      <HeaderModal
        closeModal={closeCreateLinkModel}
        titleModal="Cadastrar link"
      ></HeaderModal>

      <form onSubmit={createLink} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Link className="text-zinc-400 size-5" />
          <input
            type="text"
            name="title"
            required
            placeholder="Qual o link?"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Link2 className="text-zinc-400 size-5" />
          <input
            type="url"
            name="url"
            required
            placeholder="Url do link"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <Button type="submit" size="full">
          Salvar link
        </Button>
      </form>
    </Modal>
  );
}
