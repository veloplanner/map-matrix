import { MapSource } from "../types";
import { VELO_ROUTES_OVERLAY } from "./veloRoutesLayers";

export const MAP_SOURCES: Record<string, MapSource> = {
  veloplanner: {
    id: "veloplanner",
    name: "Veloplanner",
    type: "vector",
    style: "https://services.velomapa.pl/basemap/styles/velomapa.json",
    overlays: [VELO_ROUTES_OVERLAY],
  },
  cyclosm: {
    id: "cyclosm",
    name: "CyclOSM",
    type: "raster",
    url: "https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors; CyclOSM",
  },
  waymarkedtrails: {
    id: "waymarkedtrails",
    name: "Waymarked Trails",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    overlayUrls: ["https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png"],
    attribution: "© OpenStreetMap contributors; Waymarked Trails",
  },
  openstreetmap: {
    id: "openstreetmap",
    name: "OpenStreetMap",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
} as const;

export const DEFAULT_SOURCE_ID = Object.keys(MAP_SOURCES)[0];