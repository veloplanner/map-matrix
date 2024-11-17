import { Map as MapGL, ViewState } from "@vis.gl/react-maplibre";
import { MapState } from "../types";
import { MAP_SOURCES } from "../constants/mapSources";

interface MapProps {
  mapState: MapState;
  sourceId: string;
  onMapChange: (state: Partial<MapState>) => void;
}

export function Map({ mapState, sourceId, onMapChange }: MapProps) {
  const source = MAP_SOURCES[sourceId];

  function handleMove({ viewState }: { viewState: ViewState }) {
    onMapChange({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch,
    });
  }

  if (source.type === "raster") {
    return (
      <MapGL
        style={{ width: "100%", height: "100%" }}
        maxZoom={20}
        onMove={handleMove}
        {...mapState}
        longitude={mapState.center[0]}
        latitude={mapState.center[1]}
        attributionControl={true}
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
      {...mapState}
      longitude={mapState.center[0]}
      latitude={mapState.center[1]}
      mapStyle={source.style}
    />
  );
}
