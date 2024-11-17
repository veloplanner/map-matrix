import {
  Map as MapGL,
  ViewStateChangeEvent,
  Layer,
  Source,
} from "@vis.gl/react-maplibre";
import { Map as GoogleMap, APIProvider } from "@vis.gl/react-google-maps";
import { MapState } from "../types";
import { GOOGLE_SOURCES, MAP_SOURCES } from "../constants/mapSources";
import { useApp } from "../contexts/AppContext";
import { SourceSpecification } from "maplibre-gl";
import { MapContextMenu } from "./MapContextMenu";
import { useState } from "react";

interface MapProps {
  mapState: MapState;
  sourceId: string;
  synchronized: boolean;
  onMapChange: (state: Partial<MapState>) => void;
  onViewStateChange: (state: Partial<MapState>) => void;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  lat: number;
  lng: number;
}

export function Map({
  mapState: effectiveMapState,
  sourceId,
  synchronized,
  onMapChange,
  onViewStateChange,
}: MapProps) {
  const { state } = useApp();
  const source =
    MAP_SOURCES[sourceId] ||
    state.customSources[sourceId] ||
    GOOGLE_SOURCES[sourceId];
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    lat: 0,
    lng: 0,
  });

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

  function handleContextMenu(
    event: maplibregl.MapMouseEvent & { originalEvent: MouseEvent }
  ) {
    event.originalEvent.preventDefault();
    const { x, y } = event.point;
    const { lng, lat } = event.lngLat;

    setContextMenu({
      show: true,
      x: x,
      y: y,
      lat: lat,
      lng: lng,
    });
  }

  // Handle Google Maps source
  if (source.type === "google") {
    if (!state.apiKeys?.googleMaps) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          Google Maps API key is required
        </div>
      );
    }

    return (
      <APIProvider apiKey={state.apiKeys.googleMaps}>
        <div className="relative w-full h-full">
          <GoogleMap
            disableDefaultUI={true}
            center={{
              lat: effectiveMapState.center[1],
              lng: effectiveMapState.center[0],
            }}
            zoom={effectiveMapState.zoom}
            mapTypeId={source.mapType}
            heading={effectiveMapState.bearing}
            tilt={effectiveMapState.pitch}
            gestureHandling="greedy"
            onCameraChanged={({ detail: { center, zoom, heading, tilt } }) => {
              const newState: Partial<MapState> = {
                center: [center.lng, center.lat],
                zoom,
                bearing: heading ?? effectiveMapState.bearing,
                pitch: tilt ?? effectiveMapState.pitch,
              };

              if (synchronized) {
                onMapChange(newState);
              } else {
                onViewStateChange(newState);
              }
            }}
          />
        </div>
      </APIProvider>
    );
  }

  if (source.type === "raster") {
    const overlayUrls = source.overlayUrls || [];
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
      <div className="relative w-full h-full">
        <MapGL
          style={{ width: "100%", height: "100%" }}
          maxZoom={20}
          onMove={handleMove}
          onContextMenu={handleContextMenu}
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
        >
          {contextMenu.show && (
            <MapContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              lat={contextMenu.lat}
              lng={contextMenu.lng}
              zoom={effectiveMapState.zoom}
              onClose={() =>
                setContextMenu((prev) => ({ ...prev, show: false }))
              }
            />
          )}
        </MapGL>
      </div>
    );
  }

  if (source.type === "vector") {
    return (
      <div className="relative w-full h-full">
        <MapGL
          style={{ width: "100%", height: "100%" }}
          maxZoom={20}
          onMove={handleMove}
          onContextMenu={handleContextMenu}
          {...effectiveMapState}
          longitude={effectiveMapState.center[0]}
          latitude={effectiveMapState.center[1]}
          mapStyle={source.style}
        >
          {source.overlays?.map((overlay) => (
            <Source
              key={overlay.sourceId}
              id={overlay.sourceId}
              type="vector"
              url={overlay.url}
            >
              {overlay.layers.map((layer) => (
                <Layer key={layer.id} {...layer} />
              ))}
            </Source>
          ))}
          {contextMenu.show && (
            <MapContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              lat={contextMenu.lat}
              lng={contextMenu.lng}
              zoom={effectiveMapState.zoom}
              onClose={() =>
                setContextMenu((prev) => ({ ...prev, show: false }))
              }
            />
          )}
        </MapGL>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      Unknown source type
    </div>
  );
}
