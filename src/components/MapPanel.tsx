import { useApp } from "../contexts/AppContext";
import { Map } from "./Map";
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
      className={`w-full h-full bg-white rounded-lg shadow-sm overflow-hidden ${
        className ?? ""
      }`}
    >
      <Map
        mapState={state.mapState}
        sourceId={panel.sourceId}
        onMapChange={handleMapChange}
      />
    </div>
  );
}
