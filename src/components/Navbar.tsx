import { useState } from "react";
import { Toolbar } from "./Toolbar";
import { NewSourceFormData } from "../types";
import { AddSourceDialog } from "./AddSourceDialog";
import { useApp } from "../contexts/AppContext";

export function Navbar() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { dispatch } = useApp();

  function handleAddSource(formData: NewSourceFormData) {
    const id = `custom-${Date.now()}`;
    const newSource: any = {
      id,
      ...formData,
    };

    dispatch({
      type: "ADD_CUSTOM_SOURCE",
      payload: { id, source: newSource },
    });
    setShowAddDialog(false);
  }

  return (
    <>
      <nav className="h-14 bg-white border-b border-slate-200">
        <div className="h-full mx-auto px-4 flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-8">
            <h1 className="text-lg font-semibold text-slate-900">MapMatrix</h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddDialog(true)}
                className="p-1 rounded hover:bg-slate-100"
              >
                Add Custom Source
              </button>

              <Toolbar />
            </div>
          </div>
        </div>
      </nav>

      {showAddDialog && (
        <AddSourceDialog
          onAdd={handleAddSource}
          onClose={() => setShowAddDialog(false)}
        />
      )}
    </>
  );
}
