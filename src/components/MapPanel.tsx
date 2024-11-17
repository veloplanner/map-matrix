import { useApp } from "../contexts/AppContext";
import { Map } from "./Map";
import { Panel, MapState } from "../types";
import { SourceSelector } from "./SourceSelector";
import { useRef, useState, useEffect } from "react";

interface MapPanelProps {
  panel: Panel;
  className?: string;
}

const isFullscreenSupported = document.fullscreenEnabled;

export function MapPanel({ panel, className }: MapPanelProps) {
  const { state, dispatch } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  async function toggleFullscreen() {
    if (!panelRef.current) return;

    try {
      if (!isFullscreen) {
        await panelRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }

  // Update fullscreen state when exiting via Esc key
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === panelRef.current);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <div
      ref={panelRef}
      className={`flex flex-col w-full h-full bg-white rounded-lg shadow-sm overflow-hidden ${
        className ?? ""
      }`}
    >
      <div className="p-2 md:p-3 border-b border-slate-200 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <SourceSelector panelId={panel.id} currentSourceId={panel.sourceId} />
          <div className="flex items-center gap-2">
            {isFullscreenSupported && (
              <button
                onClick={toggleFullscreen}
                className="px-2 py-1 rounded text-sm text-slate-600 hover:bg-slate-100"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8V3m0 0h5M3 3l5 5m13-5h-5m5 0v5m0 0l-5-5M3 16v5m0 0h5m-5 0l5-5m13 5v-5m0 5h-5m5 0l-5-5"
                    />
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={() =>
                dispatch({
                  type: "TOGGLE_PANEL_SYNC",
                  payload: { panelId: panel.id },
                })
              }
              className={`px-2 py-1 rounded text-sm ${
                panel.synchronized
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {panel.synchronized ? "Synced" : "Unsynced"}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex items-center text-sm text-slate-600 whitespace-nowrap min-w-fit gap-4 px-0.5">
            <div className="w-[80px]">
              Zoom: {effectiveMapState.zoom.toFixed(2)}
            </div>
            <div className="w-[120px]">
              Lat: {effectiveMapState.center[1].toFixed(4)}°
            </div>
            <div className="w-[120px]">
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
