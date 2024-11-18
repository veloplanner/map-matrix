import { useState } from "react";
import { useModalClose } from "../hooks/useModalClose";
import { useApp } from "../contexts/AppContext";
import { AddSourceDialog, NewSourceFormData } from "./AddSourceDialog";

interface CustomSourcesDialogProps {
  onClose: () => void;
}

export function CustomSourcesDialog({ onClose }: CustomSourcesDialogProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { state, dispatch } = useApp();
  const { handleOverlayClick } = useModalClose(onClose);

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
  }

  function handleRemoveSource(sourceId: string) {
    if (window.confirm("Are you sure you want to remove this source?")) {
      dispatch({ type: "REMOVE_CUSTOM_SOURCE", payload: sourceId });
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Custom Sources</h2>
          <button
            onClick={() => setShowAddDialog(true)}
            className="px-3 py-1.5 text-sm rounded bg-brand text-white hover:bg-brand/90"
          >
            Add New Source
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {Object.entries(state.customSources).length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No custom sources added yet
            </p>
          ) : (
            <div className="space-y-2">
              {Object.entries(state.customSources).map(([id, source]) => (
                <div
                  key={id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <h3 className="font-medium">{source.name}</h3>
                    <p className="text-sm text-gray-500">
                      {source.type === "raster" ? source.url : source.style}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveSource(id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Remove source"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Close
          </button>
        </div>
      </div>

      {showAddDialog && (
        <AddSourceDialog
          onAdd={(source) => {
            handleAddSource(source);
            setShowAddDialog(false);
          }}
          onClose={() => setShowAddDialog(false)}
        />
      )}
    </div>
  );
}
