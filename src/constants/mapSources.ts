import { MapSource } from "../types";
import { VELO_ROUTES_OVERLAY } from "./veloRoutesLayers";

export const GOOGLE_SOURCES: Record<string, MapSource> = {
  googleRoadmap: {
    id: "googleRoadmap",
    name: "Google Maps",
    type: "google",
    mapType: "roadmap",
  },
  googleSatellite: {
    id: "googleSatellite",
    name: "Google Satellite",
    type: "google",
    mapType: "satellite",
  },
  googleHybrid: {
    id: "googleHybrid",
    name: "Google Hybrid",
    type: "google",
    mapType: "hybrid",
  },
  googleTerrain: {
    id: "googleTerrain",
    name: "Google Terrain",
    type: "google",
    mapType: "terrain",
  },
} as const;

export const RADAR_SOURCES: Record<string, MapSource> = {
  radarRoadmap: {
    id: "radarRoadmap",
    name: "Radar Maps",
    type: "vector",
    style: "https://api.radar.io/maps/styles/radar-default-v1",
    apiKeyRequired: {
      key: "radarMaps",
      urlParam: "publishableKey",
    },
  },
} as const;

const VELOMAPA_BASEMAP_KEY = "veloplanner_basemap";

export const MAP_SOURCES: Record<string, MapSource> = {
  openstreetmap: {
    id: "openstreetmap",
    name: "OpenStreetMap",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
  openFreeMap: {
    id: "openFreeMap",
    name: "OpenFreeMap",
    type: "vector",
    style: "https://tiles.openfreemap.org/styles/liberty",
  },
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
  waymarkedtrails_cycling: {
    id: "waymarkedtrails_cycling",
    name: "Waymarked Trails Cycling",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    overlayUrls: ["https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png"],
    attribution: "© OpenStreetMap contributors; Waymarked Trails",
  },
  [VELOMAPA_BASEMAP_KEY]: {
    id: VELOMAPA_BASEMAP_KEY,
    name: "Veloplanner Basemap",
    type: "vector",
    style: "https://services.velomapa.pl/basemap/styles/velomapa.json",
  },
} as const;

export const STADIA_SOURCES: Record<string, MapSource> = {
  stadiaAlidadeSmooth: {
    id: "stadiaAlidadeSmooth",
    name: "Stadia Alidade Smooth",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
  },
  stadiaOsmBright: {
    id: "stadiaOsmBright",
    name: "Stadia OSM Bright",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
  },
  stadiaStamenTerrain: {
    id: "stadiaStamenTerrain",
    name: "Stadia Stamen Terrain",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/stamen_terrain.json",
  },
  stadiaOutdoors: {
    id: "stadiaOutdoors",
    name: "Stadia Outdoors",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/outdoors.json",
  },
} as const;

export const DEFAULT_SOURCE_ID = VELOMAPA_BASEMAP_KEY;
