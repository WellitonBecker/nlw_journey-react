import { AtSign, User } from "lucide-react";
import { FormEvent } from "react";
import Button from "../components/button";
import HeaderModal from "../components/headerModal";
import Modal from "../components/modal";

interface ConfirmTripModalOpenProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (owner_name: string) => void;
  setOwnerEmail: (owner_email: string) => void;
}

export default function ConfirmTripModalOpen({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalOpenProps) {
  return (
    <Modal>
      <HeaderModal
        closeModal={closeConfirmTripModal}
        titleModal="Confirmar criação da viagem"
      >
        Para concluir a criação da viagem para{" "}
        <span className="font-semibold text-zinc-100">Florianópolis</span>,
        Brasil nas datas de{" "}
        <span className="font-semibold text-zinc-100">
          16 a 27 de Agosto de 2024
        </span>{" "}
        preencha seus dados abaixo:
      </HeaderModal>

      <form className="space-y-3" onSubmit={createTrip}>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="text-zinc-400 size-5" />
          <input
            type="text"
            name="name"
            required
            placeholder="Seu nome completo"
            onChange={(event) => setOwnerName(event.target.value)}
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            required
            onChange={(event) => setOwnerEmail(event.target.value)}
            placeholder="Seu e-mail pessoal"
            className="bg-transparent text-lg placeholder-zinc-400 w-48  outline-none flex-1"
          />
        </div>
        <Button size="full" type="submit">
          Confirmar criação de viagem
        </Button>
      </form>
    </Modal>
  );
}
