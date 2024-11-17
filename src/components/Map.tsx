import { Map as MapGL, ViewState } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MapState } from "../types";

interface MapProps {
  mapState: MapState;
  sourceId: string;
  onMapChange: (state: Partial<MapState>) => void;
}

export function Map({ mapState, onMapChange }: MapProps) {
  function handleMove({ viewState }: { viewState: ViewState }) {
    onMapChange({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch,
    });
  }

  return (
    <MapGL
      style={{ width: "100%", height: "100%" }}
      maxZoom={20}
      onMove={handleMove}
      {...mapState}
      longitude={mapState.center[0]}
      latitude={mapState.center[1]}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
