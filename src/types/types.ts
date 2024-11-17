import type { LayerSpecification } from "maplibre-gl";

export type BoxCount = 1 | 2 | 3 | 4 | 5 | 6;

export interface ApiKeys {
  googleMaps?: string;
}

export interface AppState {
  layout: {
    boxCount: BoxCount;
    isToolbarExpanded: boolean;
  };
  panels: Panel[];
  mapState: MapState;
  customSources: Record<string, MapSource>;
  apiKeys?: ApiKeys;
}

export interface Panel {
  id: string;
  sourceId: string;
  position: number;
  synchronized: boolean;
  localMapState?: MapState; // For unsynchronized panels
}

export interface MapState {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface VectorSource {
  id: string;
  name: string;
  type: "vector";
  style: string;
  overlays?: {
    sourceId: string;
    url: string;
    layers: LayerSpecification[];
  }[];
}

export interface RasterSource {
  id: string;
  name: string;
  type: "raster";
  url: string;
  overlayUrls?: string[];
  attribution: string;
}

export type MapSource = VectorSource | RasterSource;

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
