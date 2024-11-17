import { createContext, useContext, useReducer, ReactNode } from "react";
import { AppState, BoxCount, MapState } from "../types";

const initialMapState: MapState = {
  center: [-74.5, 40],
  zoom: 9,
  bearing: 0,
  pitch: 0,
};

const initialState: AppState = {
  layout: {
    boxCount: 1,
    isToolbarExpanded: true,
  },
  panels: [
    {
      id: "1",
      sourceId: "maplibre-default",
      position: 0,
    },
  ],
  mapState: initialMapState,
};

type Action =
  | { type: "SET_BOX_COUNT"; payload: BoxCount }
  | { type: "TOGGLE_TOOLBAR" }
  | { type: "UPDATE_MAP_STATE"; payload: Partial<MapState> }
  | {
      type: "UPDATE_PANEL_SOURCE";
      payload: { panelId: string; sourceId: string };
    };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_BOX_COUNT":
      return {
        ...state,
        layout: {
          ...state.layout,
          boxCount: action.payload,
        },
        panels: state.panels.slice(0, action.payload),
      };

    case "TOGGLE_TOOLBAR":
      return {
        ...state,
        layout: {
          ...state.layout,
          isToolbarExpanded: !state.layout.isToolbarExpanded,
        },
      };

    case "UPDATE_MAP_STATE":
      return {
        ...state,
        mapState: {
          ...state.mapState,
          ...action.payload,
        },
      };

    case "UPDATE_PANEL_SOURCE":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id === action.payload.panelId
            ? { ...panel, sourceId: action.payload.sourceId }
            : panel
        ),
      };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
