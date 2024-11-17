import { MapSource } from "../types";

export const MAP_SOURCES: Record<string, MapSource> = {
  openstreetmap: {
    id: "openstreetmap",
    name: "OpenStreetMap",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
  "carto-dark": {
    id: "carto-dark",
    name: "Carto Dark",
    type: "vector",
    style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  },
  "carto-light": {
    id: "carto-light",
    name: "Carto Light",
    type: "vector",
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  },
  cyclosm: {
    id: "cyclosm",
    name: "CyclOSM",
    type: "raster",
    url: "https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors; CyclOSM",
  },
  veloplanner_basemap: {
    id: "veloplanner_basemap",
    name: "Veloplanner Basemap",
    type: "vector",
    style: "https://services.velomapa.pl/basemap/styles/velomapa.json",
  },
} as const;

export const DEFAULT_SOURCE_ID = Object.keys(MAP_SOURCES)[0];
