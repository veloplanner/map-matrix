import { useApp } from "../contexts/AppContext";
import { Map } from "./Map";
import { Panel } from "../types";
import { SourceSelector } from "./SourceSelector";

interface MapPanelProps {
  panel: Panel;
  className?: string;
}

export function MapPanel({ panel, className }: MapPanelProps) {
  const { state, dispatch } = useApp();

  function handleMapChange(changes: Partial<typeof state.mapState>) {
    dispatch({ type: "UPDATE_MAP_STATE", payload: changes });
  }

  function handleSyncToggle() {
    dispatch({
      type: "TOGGLE_PANEL_SYNC",
      payload: { panelId: panel.id },
    });
  }

  return (
    <div
      className={`flex flex-col w-full h-full bg-white rounded-lg shadow-sm overflow-hidden ${
        className ?? ""
      }`}
    >
      <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
        <SourceSelector panelId={panel.id} currentSourceId={panel.sourceId} />
        <button
          onClick={handleSyncToggle}
          className={`ml-2 px-2 py-1 rounded text-sm ${
            panel.synchronized
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {panel.synchronized ? "Synced" : "Unsynced"}
        </button>
      </div>
      <div className="flex-1">
        <Map
          mapState={state.mapState}
          sourceId={panel.sourceId}
          synchronized={panel.synchronized}
          onMapChange={handleMapChange}
        />
      </div>
    </div>
  );
}
