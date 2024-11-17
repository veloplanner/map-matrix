import {
  Map as GoogleMapGL,
  APIProvider,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { GoogleMapsSource, MapState } from "../types";
import { useState } from "react";

interface GoogleMapProps {
  mapState: MapState;
  source: GoogleMapsSource;
  apiKey: string;
  synchronized: boolean;
  onMapChange: (state: Partial<MapState>) => void;
  onViewStateChange: (state: Partial<MapState>) => void;
}

export function GoogleMap({
  mapState: effectiveMapState,
  source,
  apiKey,
  synchronized,
  onMapChange,
  onViewStateChange,
}: GoogleMapProps) {
  const [isActive, setIsActive] = useState(false);

  const handleCameraChange = (event: MapCameraChangedEvent) => {
    const newState: Partial<MapState> = {
      center: [event.detail.center.lng, event.detail.center.lat],
      zoom: event.detail.zoom,
      bearing: event.detail.heading ?? effectiveMapState.bearing,
      pitch: event.detail.tilt ?? effectiveMapState.pitch,
    };

    if (synchronized) {
      onMapChange(newState);
    } else {
      onViewStateChange(newState);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="relative w-full h-full">
        <GoogleMapGL
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
          onMouseover={() => setIsActive(true)}
          onMouseout={() => setIsActive(false)}
          onCameraChanged={isActive ? handleCameraChange : undefined}
        />
      </div>
    </APIProvider>
  );
}
