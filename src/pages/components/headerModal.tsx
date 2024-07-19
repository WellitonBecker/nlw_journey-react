import { X } from "lucide-react";
import { ReactNode } from "react";

interface HeaderModalProps {
  closeModal: () => void;
  titleModal: string;
  children?: ReactNode;
}

export default function HeaderModal({
  closeModal,
  titleModal,
  children,
}: HeaderModalProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{titleModal}</h2>
        <button>
          <X className="size-5 text-zinc-400" onClick={closeModal} />
        </button>
      </div>
      <p className="text-sm text-zinc-400">{children}</p>
    </div>
  );
}
