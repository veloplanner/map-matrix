import {
  MAP_SOURCES,
  GOOGLE_SOURCES,
  RADAR_SOURCES,
  STADIA_SOURCES,
  THUNDERFOREST_SOURCES,
} from "../constants/mapSources";
import { useApp } from "../contexts/AppContext";

interface SourceSelectorProps {
  panelId: string;
  currentSourceId: string;
}

export function SourceSelector({
  panelId,
  currentSourceId,
}: SourceSelectorProps) {
  const { state, dispatch } = useApp();
  const isGoogleMapsKeyMissing = !state.apiKeys?.googleMaps;
  const isRadarMapsKeyMissing = !state.apiKeys?.radarMaps;

  return (
    <select
      value={currentSourceId}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_PANEL_SOURCE",
          payload: { panelId, sourceId: e.target.value },
        })
      }
      className="w-full text-xs md:text-sm border border-slate-200 rounded px-1 py-1 md:px-2 md:py-1.5 pr-6 bg-white truncate"
    >
      {Object.keys(state.customSources).length > 0 && (
        <optgroup label="Custom Sources">
          {Object.values(state.customSources).map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </optgroup>
      )}

      {Object.values(MAP_SOURCES).map((source) => (
        <option key={source.id} value={source.id}>
          {source.name}
        </option>
      ))}

      <optgroup label="Stadia Maps">
        {Object.values(STADIA_SOURCES).map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </optgroup>

      <optgroup label="Thunderforest Maps">
        {Object.values(THUNDERFOREST_SOURCES).map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </optgroup>

      <optgroup
        label={
          isGoogleMapsKeyMissing
            ? "Google Maps (add key to select)"
            : "Google Maps"
        }
      >
        {Object.values(GOOGLE_SOURCES).map((source) => (
          <option
            key={source.id}
            value={source.id}
            disabled={isGoogleMapsKeyMissing}
          >
            {source.name}
          </option>
        ))}
      </optgroup>

      <optgroup
        label={
          isRadarMapsKeyMissing
            ? "Radar Maps (add key to select)"
            : "Radar Maps"
        }
      >
        {Object.values(RADAR_SOURCES).map((source) => (
          <option
            key={source.id}
            value={source.id}
            disabled={isRadarMapsKeyMissing}
          >
            {source.name}
          </option>
        ))}
      </optgroup>
    </select>
  );
}
