import { useApp } from "../contexts/AppContext";
import { Map } from "./Map";
import { Panel, MapState } from "../types";
import { SourceSelector } from "./SourceSelector";

interface MapPanelProps {
  panel: Panel;
  className?: string;
}

export function MapPanel({ panel, className }: MapPanelProps) {
  const { state, dispatch } = useApp();
  const effectiveMapState = panel.synchronized
    ? state.mapState
    : panel.localMapState ?? state.mapState;

  function handleMapChange(changes: Partial<typeof state.mapState>) {
    if (panel.synchronized) {
      dispatch({ type: "UPDATE_MAP_STATE", payload: changes });
    }
  }

  function handleViewStateChange(changes: Partial<MapState>) {
    if (!panel.synchronized) {
      dispatch({
        type: "UPDATE_PANEL_LOCAL_STATE",
        payload: {
          panelId: panel.id,
          mapState: { ...effectiveMapState, ...changes },
        },
      });
    }
  }

  return (
    <div
      className={`flex flex-col w-full h-full bg-white rounded-lg shadow-sm overflow-hidden ${
        className ?? ""
      }`}
    >
      <div className="p-3 border-b border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <SourceSelector panelId={panel.id} currentSourceId={panel.sourceId} />
          <button
            onClick={() =>
              dispatch({
                type: "TOGGLE_PANEL_SYNC",
                payload: { panelId: panel.id },
              })
            }
            className={`ml-2 px-2 py-1 rounded text-sm ${
              panel.synchronized
                ? "bg-slate-200 text-slate-900"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {panel.synchronized ? "Synced" : "Unsynced"}
          </button>
        </div>
        <div className="flex items-center justify-end text-sm text-slate-600">
          <div className="flex items-center gap-4 ">
            <div style={{ width: 100 }}>
              Zoom: {effectiveMapState.zoom.toFixed(2)}
            </div>
            <div style={{ width: 100 }}>
              Lat: {effectiveMapState.center[1].toFixed(4)}°
            </div>
            <div style={{ width: 100 }}>
              Lon: {effectiveMapState.center[0].toFixed(4)}°
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Map
          mapState={effectiveMapState}
          sourceId={panel.sourceId}
          synchronized={panel.synchronized}
          onMapChange={handleMapChange}
          onViewStateChange={handleViewStateChange}
        />
      </div>
    </div>
  );
}
