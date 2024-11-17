import { useApp } from "../contexts/AppContext";
import { MapPanel } from "./MapPanel";
import { Navbar } from "./Navbar";
import { GRID_LAYOUTS } from "../constants/layouts";

export function Layout() {
  const { state } = useApp();
  const { boxCount } = state.layout;
  const layout = GRID_LAYOUTS[boxCount];

  const gridStyle = {
    gridTemplateAreas: `"${layout.areas.join('" "')}"`,
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 bg-slate-100">
        <div
          className={`grid gap-4 h-full ${layout.cols} ${layout.rows}`}
          style={gridStyle}
        >
          {state.panels.map((panel, index) => (
            <MapPanel
              key={panel.id}
              panel={panel}
              className={`grid-in-${layout.areas[index].trim()}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
