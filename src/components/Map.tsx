import { Map as MapGL, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import { MapState } from "../types";
import { MAP_SOURCES } from "../constants/mapSources";
import { useApp } from "../contexts/AppContext";

interface MapProps {
  mapState: MapState;
  sourceId: string;
  synchronized: boolean;
  onMapChange: (state: Partial<MapState>) => void;
  onViewStateChange: (state: Partial<MapState>) => void;
}

export function Map({
  mapState: effectiveMapState,
  sourceId,
  synchronized,
  onMapChange,
  onViewStateChange,
}: MapProps) {
  const { state } = useApp();
  const source = MAP_SOURCES[sourceId] || state.customSources[sourceId];

  function handleMove(evt: ViewStateChangeEvent) {
    const newState: Partial<MapState> = {
      center: [evt.viewState.longitude, evt.viewState.latitude] as [
        number,
        number
      ],
      zoom: evt.viewState.zoom,
      bearing: evt.viewState.bearing,
      pitch: evt.viewState.pitch,
    };

    if (synchronized) {
      onMapChange(newState);
    } else {
      onViewStateChange(newState);
    }
  }

  if (source.type === "raster") {
    return (
      <MapGL
        style={{ width: "100%", height: "100%" }}
        maxZoom={20}
        onMove={handleMove}
        {...effectiveMapState}
        longitude={effectiveMapState.center[0]}
        latitude={effectiveMapState.center[1]}
        mapStyle={{
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [source.url],
              tileSize: 256,
              attribution: source.attribution,
            },
          },
          layers: [
            {
              id: "raster-layer",
              type: "raster",
              source: "raster-tiles",
            },
          ],
        }}
      />
    );
  }

  return (
    <MapGL
      style={{ width: "100%", height: "100%" }}
      maxZoom={20}
      onMove={handleMove}
      {...effectiveMapState}
      longitude={effectiveMapState.center[0]}
      latitude={effectiveMapState.center[1]}
      mapStyle={source.style}
    />
  );
}
