import { createContext, ReactNode, useCallback, useContext } from "react";
import { DEFAULT_SOURCE_ID, MAP_SOURCES } from "../constants/mapSources";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppState, BoxCount, MapSource, MapState } from "../types";

function getInitialPanels() {
  // Get available source IDs excluding the default one
  const availableSources = Object.keys(MAP_SOURCES).filter(
    (id) => id !== DEFAULT_SOURCE_ID
  );

  // Create 4 panels with unique sources where possible
  return Array.from({ length: 4 }, (_, index) => ({
    id: String(index + 1),
    sourceId: availableSources[index] || DEFAULT_SOURCE_ID,
    position: index,
    synchronized: true,
  }));
}

function findUnusedSource(usedSources: string[]): string {
  const unusedSource = Object.keys(MAP_SOURCES).find(
    (sourceId) => !usedSources.includes(sourceId)
  );
  return unusedSource || DEFAULT_SOURCE_ID;
}

const initialMapState: MapState = {
  center: [15, 50], // Roughly center of Europe
  zoom: 4, // Good zoom level to see most of Europe
  bearing: 0,
  pitch: 0,
};

const initialState: AppState = {
  layout: {
    boxCount: 4,
    isToolbarExpanded: true,
  },
  panels: getInitialPanels(),
  mapState: initialMapState,
  customSources: {},
};

const STORAGE_KEY = "mapmatrix-state";

type Action =
  | { type: "SET_BOX_COUNT"; payload: BoxCount }
  | { type: "TOGGLE_TOOLBAR" }
  | { type: "UPDATE_MAP_STATE"; payload: Partial<MapState> }
  | {
      type: "UPDATE_PANEL_SOURCE";
      payload: { panelId: string; sourceId: string };
    }
  | { type: "TOGGLE_PANEL_SYNC"; payload: { panelId: string } }
  | {
      type: "UPDATE_PANEL_LOCAL_STATE";
      payload: { panelId: string; mapState: MapState };
    }
  | { type: "ADD_CUSTOM_SOURCE"; payload: { id: string; source: MapSource } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_BOX_COUNT": {
      const newCount = action.payload;
      const currentPanels = [...state.panels];

      if (newCount > currentPanels.length) {
        // Adding new panels
        const usedSources = currentPanels.map((panel) => panel.sourceId);
        const newPanels = Array.from(
          { length: newCount - currentPanels.length },
          (_, index) => ({
            id: String(currentPanels.length + index + 1),
            sourceId: findUnusedSource(usedSources),
            position: currentPanels.length + index,
            synchronized: true,
          })
        );

        return {
          ...state,
          layout: {
            ...state.layout,
            boxCount: newCount,
          },
          panels: [...currentPanels, ...newPanels],
        };
      } else {
        // Removing panels
        return {
          ...state,
          layout: {
            ...state.layout,
            boxCount: newCount,
          },
          panels: currentPanels.slice(0, newCount),
        };
      }
    }

    case "UPDATE_PANEL_SOURCE": {
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id === action.payload.panelId
            ? { ...panel, sourceId: action.payload.sourceId }
            : panel
        ),
      };
    }

    case "UPDATE_MAP_STATE": {
      return {
        ...state,
        mapState: {
          ...state.mapState,
          ...action.payload,
        },
      };
    }

    case "TOGGLE_TOOLBAR": {
      return {
        ...state,
        layout: {
          ...state.layout,
          isToolbarExpanded: !state.layout.isToolbarExpanded,
        },
      };
    }

    case "TOGGLE_PANEL_SYNC": {
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id === action.payload.panelId
            ? {
                ...panel,
                synchronized: !panel.synchronized,
                localMapState: state.mapState,
              }
            : panel
        ),
      };
    }

    case "UPDATE_PANEL_LOCAL_STATE":
      return {
        ...state,
        panels: state.panels.map((panel) =>
          panel.id === action.payload.panelId
            ? { ...panel, localMapState: action.payload.mapState }
            : panel
        ),
      };

    case "ADD_CUSTOM_SOURCE":
      return {
        ...state,
        customSources: {
          ...state.customSources,
          [action.payload.id]: action.payload.source,
        },
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>(
    STORAGE_KEY,
    initialState
  );

  const dispatch = useCallback(
    (action: Action) => {
      setState((currentState) => appReducer(currentState, action));
    },
    [setState]
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
