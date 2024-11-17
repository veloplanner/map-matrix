import { useApp } from "../contexts/AppContext";
import { AVAILABLE_LAYOUTS } from "../constants/layouts";
import { BoxCount } from "../types";

export function Toolbar() {
  const { state, dispatch } = useApp();

  function handleLayoutChange(boxCount: BoxCount) {
    dispatch({ type: "SET_BOX_COUNT", payload: boxCount });
  }

  return (
    <div className="flex items-center gap-4">
      {/* Mobile Select */}
      <div className="md:hidden flex items-center gap-2">
        <select
          id="mobile-layout"
          value={state.layout.boxCount}
          onChange={(e) =>
            handleLayoutChange(Number(e.target.value) as BoxCount)
          }
          className="text-sm border border-slate-200 rounded px-2 py-1 bg-white"
        >
          {AVAILABLE_LAYOUTS.map((count) => (
            <option key={count} value={count}>
              {count} {count === 1 ? "panel" : "panels"}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-sm text-slate-600">Number of panels:</span>
        <div className="flex gap-1">
          {AVAILABLE_LAYOUTS.map((count) => (
            <button
              key={count}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors
                ${
                  state.layout.boxCount === count
                    ? "bg-slate-200 text-slate-900 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              onClick={() => handleLayoutChange(count)}
            >
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
