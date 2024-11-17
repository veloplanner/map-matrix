import { MAP_SOURCES } from "../constants/mapSources";
import { useApp } from "../contexts/AppContext";

interface SourceSelectorProps {
  panelId: string;
  currentSourceId: string;
}

export function SourceSelector({
  panelId,
  currentSourceId,
}: SourceSelectorProps) {
  const { dispatch } = useApp();

  function handleSourceChange(sourceId: string) {
    dispatch({
      type: "UPDATE_PANEL_SOURCE",
      payload: { panelId, sourceId },
    });
  }

  return (
    <select
      value={currentSourceId}
      onChange={(e) => handleSourceChange(e.target.value)}
      className="text-sm border border-slate-200 rounded px-2 py-1 bg-white hover:bg-slate-50"
    >
      {Object.values(MAP_SOURCES).map((source) => (
        <option key={source.id} value={source.id}>
          {source.name}
        </option>
      ))}
    </select>
  );
}
