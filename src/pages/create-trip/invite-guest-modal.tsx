import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import Button from "../components/button";
import Separator from "../components/separtor";
import Modal from "../components/modal";
import HeaderModal from "../components/headerModal";

interface InviteGuestModalProps {
  closeGuestModal: () => void;
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailToInvite: (email: string) => void;
  emailsToInvite: string[];
}

export default function InviteGuestModal({
  closeGuestModal,
  addNewEmailToInvite,
  emailsToInvite,
  removeEmailToInvite,
}: InviteGuestModalProps) {
  return (
    <Modal>
      <HeaderModal
        closeModal={closeGuestModal}
        titleModal="Selecionar convidados"
      >
        Os convidados irão receber e-mails para confirmar a participação na
        viagem.
      </HeaderModal>

      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <button type="button">
                <X
                  onClick={() => removeEmailToInvite(email)}
                  className="size-4 text-zinc-400"
                />
              </button>
            </div>
          );
        })}
      </div>

      <Separator />

      <form
        onSubmit={addNewEmailToInvite}
        className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
      >
        <div className="flex items-center flex-1 gap-2 px-2">
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            required
            placeholder="Digite o e-mail do convidado"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <Button type="submit">
          Convidar
          <Plus className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}
