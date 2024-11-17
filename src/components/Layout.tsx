import { useApp } from "../contexts/AppContext";
import { MapPanel } from "./MapPanel";
import { Navbar } from "./Navbar";
import { GRID_LAYOUTS } from "../constants/layouts";

export function Layout() {
  const { state } = useApp();
  const { boxCount } = state.layout;
  const layout = GRID_LAYOUTS[boxCount];

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 bg-slate-100">
        <div className={`grid gap-4 h-full ${layout.cols} ${layout.rows}`}>
          {state.panels.map((panel) => (
            <MapPanel key={panel.id} panel={panel} />
          ))}
        </div>
      </main>
    </div>
  );
}
