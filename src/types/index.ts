export interface AppState {
  layout: {
    boxCount: 1 | 2 | 4;
    isToolbarExpanded: boolean;
  };
  panels: Panel[];
  mapState: MapState;
}

export interface Panel {
  id: string;
  sourceId: string;
  position: number;
  layerStates?: LayerState[];
}

export interface LayerState {
  layerId: string;
  visible: boolean;
  opacity: number;
}

export interface MapState {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface CustomMapConfig {
  id: string;
  name: string;
  baseMap: {
    type: "maplibre" | "raster";
    style?: string;
    sourceUrl?: string;
    attribution?: string;
  };
  layers: Layer[];
}

export interface Layer {
  id: string;
  name: string;
  type: "vector" | "raster" | "geojson";
  source: {
    type: "vector" | "raster" | "geojson";
    url: string;
    attribution?: string;
  };
  paint?: Record<string, unknown>;
  layout?: Record<string, unknown>;
  minzoom?: number;
  maxzoom?: number;
  defaultVisible?: boolean;
}
