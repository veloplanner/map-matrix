import { useApp } from "../contexts/AppContext";
import { Map } from "./Map";
import { SourceSelector } from "./SourceSelector";
import { Panel } from "../types";

interface MapPanelProps {
  panel: Panel;
  className?: string;
}

export function MapPanel({ panel, className }: MapPanelProps) {
  const { state, dispatch } = useApp();

  function handleMapChange(changes: Partial<typeof state.mapState>) {
    dispatch({ type: "UPDATE_MAP_STATE", payload: changes });
  }

  return (
    <div
      className={`flex flex-col w-full h-full bg-white rounded-lg shadow-sm overflow-hidden ${
        className ?? ""
      }`}
    >
      <div className="px-3 py-2 border-b border-slate-200">
        <SourceSelector panelId={panel.id} currentSourceId={panel.sourceId} />
      </div>
      <div className="flex-1">
        <Map
          mapState={state.mapState}
          sourceId={panel.sourceId}
          onMapChange={handleMapChange}
        />
      </div>
    </div>
  );
}
