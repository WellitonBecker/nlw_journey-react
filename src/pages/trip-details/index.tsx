import { useState } from "react";
import CreateActivityModal from "./create-activity-modal";
import ImportantLinks from "./important-links";
import Guests from "./guests";
import Activities from "./activityies";
import DestinationAndDataHeader from "./destination-and-data-header";
import { Plus } from "lucide-react";
import Button from "../components/button";
import Separator from "../components/separtor";

export default function TripDetailsPage() {
  const [isCreateActivityModelOpen, setIsCreateActivityModelOpen] =
    useState(false);

  function openCreateActivityModel() {
    setIsCreateActivityModelOpen(true);
  }

  function closeCreateActivityModel() {
    setIsCreateActivityModelOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDataHeader />
      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModel}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <Separator />
          <Guests />
        </div>
      </main>

      {isCreateActivityModelOpen && (
        <CreateActivityModal
          closeCreateActivityModel={closeCreateActivityModel}
        />
      )}
    </div>
  );
}
