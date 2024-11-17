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
      <span className="text-sm text-slate-600">Number of panels:</span>
      <div className="flex gap-1">
        {AVAILABLE_LAYOUTS.map((count) => (
          <button
            key={count}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              state.layout.boxCount === count
                ? "bg-slate-200 text-slate-900"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => handleLayoutChange(count)}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
