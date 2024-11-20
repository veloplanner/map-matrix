import {
  MAP_SOURCES,
  GOOGLE_SOURCES,
  RADAR_SOURCES,
  STADIA_SOURCES,
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
  const isStadiaMapsKeyMissing = !state.apiKeys?.stadiaMaps;

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentSourceId}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_PANEL_SOURCE",
            payload: { panelId, sourceId: e.target.value },
          })
        }
        className="text-sm border border-slate-200 rounded px-2 py-1 bg-white hover:bg-slate-50"
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

        <optgroup label="Built-in Sources">
          {Object.values(MAP_SOURCES).map((source) => (
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

        <optgroup
          label={
            isStadiaMapsKeyMissing
              ? "Stadia Maps (add key to select)"
              : "Stadia Maps"
          }
        >
          {Object.values(STADIA_SOURCES).map((source) => (
            <option
              key={source.id}
              value={source.id}
              disabled={isStadiaMapsKeyMissing}
            >
              {source.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
