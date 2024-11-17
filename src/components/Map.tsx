import { Map as MapGL, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import { MapState } from "../types";
import { MAP_SOURCES } from "../constants/mapSources";
import { useApp } from "../contexts/AppContext";
import { SourceSpecification } from "maplibre-gl";

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
    const overlayUrls = source.overlayUrls || [];
    console.log("overlayUrls", overlayUrls);
    const overlaySources = overlayUrls.reduce(
      (acc: Record<string, SourceSpecification>, url, index) => {
        acc[`overlay-${index}`] = {
          type: "raster",
          tiles: [url],
          tileSize: 256,
          attribution: source.attribution,
        };
        return acc;
      },
      {}
    );

    const overLayLayers = overlayUrls.map((_url, index) => ({
      id: `overlay-${index}`,
      type: "raster" as const,
      source: `overlay-${index}`,
    }));

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
            ...overlaySources,
          },
          layers: [
            {
              id: "raster-layer",
              type: "raster",
              source: "raster-tiles",
            },
            ...overLayLayers,
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
