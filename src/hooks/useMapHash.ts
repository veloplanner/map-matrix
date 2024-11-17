import { useEffect, useRef, useState, useCallback } from "react";
import throttle from "lodash.throttle";
import { MapState } from "../types";

function parseHash(): MapState | null {
  const hash = window.location.hash.slice(1);
  const [zoom, lat, lng, bearing = "0", pitch = "0"] = hash.split("/");

  if (!zoom || !lat || !lng) return null;

  return {
    center: [parseFloat(lng), parseFloat(lat)],
    zoom: parseFloat(zoom),
    bearing: parseFloat(bearing),
    pitch: parseFloat(pitch),
  };
}

function formatHash(mapState: MapState): string {
  const { zoom, center, bearing, pitch } = mapState;
  return `#${zoom.toFixed(2)}/${center[1].toFixed(4)}/${center[0].toFixed(
    4
  )}/${bearing.toFixed(0)}/${pitch.toFixed(0)}`;
}

export function useMapHash(mapState: MapState): MapState | null {
  // Store initial hash state
  const [initialState] = useState(parseHash);

  function onHashChange(newState: MapState) {
    const newHash = formatHash(newState);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }

  // Create throttled callback
  const throttledUpdateHash = useCallback(
    throttle(onHashChange, 500),
    [] // Empty deps array as this function doesn't depend on any props/state
  );

  // Update hash when mapState changes
  useEffect(() => {
    throttledUpdateHash(mapState);
  }, [mapState, throttledUpdateHash]);

  return initialState;
}
