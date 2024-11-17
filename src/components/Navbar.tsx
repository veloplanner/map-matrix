import { useState } from "react";
import { Toolbar } from "./Toolbar";
import { AddSourceDialog, NewSourceFormData } from "./AddSourceDialog";
import { useApp } from "../contexts/AppContext";

export function Navbar() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { dispatch } = useApp();

  function handleAddSource(formData: NewSourceFormData) {
    const id = `custom-${Date.now()}`;
    const newSource = {
      id,
      ...formData,
    };

    if (newSource.type === "raster") {
      dispatch({
        type: "ADD_CUSTOM_SOURCE",
        payload: {
          id,
          source: {
            id,
            name: newSource.name,
            type: "raster",
            url: newSource.url,
            attribution: newSource.attribution,
          },
        },
      });
    } else {
      dispatch({
        type: "ADD_CUSTOM_SOURCE",
        payload: {
          id,
          source: {
            id,
            name: newSource.name,
            type: "vector",
            style: newSource.url,
          },
        },
      });
    }

    setShowAddDialog(false);
  }

  function handleReset() {
    if (
      window.confirm(
        "Are you sure you want to reset? This will clear all custom sources and settings."
      )
    ) {
      localStorage.clear();
      dispatch({ type: "RESET_STATE" });
    }
  }

  return (
    <>
      <nav className="bg-white border-b border-slate-200">
        <div className="flex flex-col md:flex-row">
          {/* Title Row (mobile) / Left Section (desktop) */}
          <div className="h-12 md:h-14 px-4 flex items-center justify-between md:justify-start md:gap-4 border-b md:border-b-0 border-slate-100">
            <h1 className="text-lg font-semibold text-slate-900">MapMatrix</h1>
            <a
              className="bg-brand/5 text-brand rounded-full px-3 py-1 text-sm"
              href="https://veloplanner.com"
            >
              by VeloPlanner
            </a>

            <a
              className="p-1 rounded hover:opacity-80"
              href="https://github.com/veloplanner/map-matrix"
              aria-label="GitHub Repository"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Controls Row (mobile) / Right Section (desktop) */}
          <div className="h-12 md:h-14 px-4 flex items-center justify-between md:ml-auto md:gap-4">
            <button
              onClick={() => setShowAddDialog(true)}
              className="text-sm px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50"
            >
              <span className="md:inline hidden">Add Custom Source</span>
              <span className="md:hidden">Add Source</span>
            </button>
            <button
              onClick={handleReset}
              className="text-sm px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-red-600"
            >
              Reset
            </button>
            <Toolbar />
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
