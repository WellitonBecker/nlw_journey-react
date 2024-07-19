import { Link2, Plus } from "lucide-react";
import Button from "../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import CreateLinkModal from "./create-link-modal";

interface Link {
  id: string;
  title: string;
  url: string;
}

export default function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    className="block font-xs text-zinc-400 truncate hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400" />
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <span className="text-zinc-500 text-sm">
              Nenhum link cadastrado!
            </span>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        size="full"
        onClick={() => setIsCreateLinkModalOpen(true)}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
      {isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateActivityModel={() => setIsCreateLinkModalOpen(false)}
        />
      )}
    </div>
  );
}
