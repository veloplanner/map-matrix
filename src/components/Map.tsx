import { Map as MapGL, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import { useState } from "react";
import { MapState } from "../types";
import { MAP_SOURCES } from "../constants/mapSources";

interface MapProps {
  mapState: MapState;
  sourceId: string;
  synchronized: boolean;
  onMapChange: (state: Partial<MapState>) => void;
}

export function Map({
  mapState: globalMapState,
  sourceId,
  synchronized,
  onMapChange,
}: MapProps) {
  const [localMapState, setLocalMapState] = useState<MapState>(globalMapState);

  const source = MAP_SOURCES[sourceId];
  const effectiveMapState = synchronized ? globalMapState : localMapState;

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
      setLocalMapState((prev) => ({ ...prev, ...newState }));
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
