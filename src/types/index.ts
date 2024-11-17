export type BoxCount = 1 | 2 | 3 | 4 | 5 | 6;

export interface AppState {
  layout: {
    boxCount: BoxCount;
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

export type MapSourceType = "maplibre" | "raster";

export interface MapSource {
  id: string;
  name: string;
  type: MapSourceType;
  style?: string;
  url?: string;
  attribution?: string;
}

export interface CustomMapConfig {
  id: string;
  name: string;
  baseMap: MapSource;
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
