import { env } from "../config/env";
import { MapSource } from "../types";
import { VELO_ROUTES_OVERLAY } from "./veloRoutesLayers";

export const GOOGLE_PROJECT_URL =
  "https://developers.google.com/maps/documentation/tile";

export const GOOGLE_SOURCES: Record<string, MapSource> = {
  googleRoadmap: {
    id: "googleRoadmap",
    name: "Google Maps",
    type: "google",
    mapType: "roadmap",
    projectUrl: GOOGLE_PROJECT_URL,
  },
  googleSatellite: {
    id: "googleSatellite",
    name: "Google Satellite",
    type: "google",
    mapType: "satellite",
    projectUrl: GOOGLE_PROJECT_URL,
  },
  googleHybrid: {
    id: "googleHybrid",
    name: "Google Hybrid",
    type: "google",
    mapType: "hybrid",
    projectUrl: GOOGLE_PROJECT_URL,
  },
  googleTerrain: {
    id: "googleTerrain",
    name: "Google Terrain",
    type: "google",
    mapType: "terrain",
    projectUrl: GOOGLE_PROJECT_URL,
  },
} as const;

export const RADAR_PROJECT_URL = "https://radar.com/documentation/maps/maps";
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
    projectUrl: RADAR_PROJECT_URL,
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
    projectUrl: "https://www.openstreetmap.org",
  },
  openFreeMap: {
    id: "openFreeMap",
    name: "OpenFreeMap",
    type: "vector",
    style: "https://tiles.openfreemap.org/styles/liberty",
    projectUrl: "https://openfreemap.org",
  },
  veloplanner: {
    id: "veloplanner",
    name: "Veloplanner",
    type: "vector",
    style: "https://services.velomapa.pl/basemap/styles/velomapa.json",
    overlays: [VELO_ROUTES_OVERLAY],
    projectUrl: "https://veloplanner.com",
  },
  cyclosm: {
    id: "cyclosm",
    name: "CyclOSM",
    type: "raster",
    url: "https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors; CyclOSM",
    projectUrl: "https://www.cyclosm.org",
  },
  waymarkedtrails_cycling: {
    id: "waymarkedtrails_cycling",
    name: "Waymarked Trails Cycling",
    type: "raster",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    overlayUrls: ["https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png"],
    attribution: "© OpenStreetMap contributors; Waymarked Trails",
    projectUrl: "https://cycling.waymarkedtrails.org",
  },
  [VELOMAPA_BASEMAP_KEY]: {
    id: VELOMAPA_BASEMAP_KEY,
    name: "Veloplanner Basemap",
    type: "vector",
    style: "https://services.velomapa.pl/basemap/styles/velomapa.json",
    projectUrl: "https://veloplanner.com",
  },
} as const;

const stadiaProjectUrl = "https://docs.stadiamaps.com/maps-for-web/";
export const STADIA_SOURCES: Record<string, MapSource> = {
  stadiaAlidadeSmooth: {
    id: "stadiaAlidadeSmooth",
    name: "Stadia Alidade Smooth",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
    projectUrl: stadiaProjectUrl,
  },
  stadiaOsmBright: {
    id: "stadiaOsmBright",
    name: "Stadia OSM Bright",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
    projectUrl: stadiaProjectUrl,
  },
  stadiaStamenTerrain: {
    id: "stadiaStamenTerrain",
    name: "Stadia Stamen Terrain",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/stamen_terrain.json",
    projectUrl: stadiaProjectUrl,
  },
  stadiaOutdoors: {
    id: "stadiaOutdoors",
    name: "Stadia Outdoors",
    type: "vector",
    style: "https://tiles.stadiamaps.com/styles/outdoors.json",
    projectUrl: stadiaProjectUrl,
  },
} as const;

const thunderforestProjectUrl = "https://www.thunderforest.com/";

export const THUNDERFOREST_SOURCES: Record<string, MapSource> = {
  thunderforestLandscape: {
    id: "thunderforestLandscape",
    name: "Thunderforest Landscape",
    type: "raster",
    url: `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${env.thunderforestApiKey}`,
    attribution: "© OpenStreetMap contributors; © Thunderforest",
    projectUrl: thunderforestProjectUrl,
  },
  thunderforestOpenCycleMap: {
    id: "thunderforestOpenCycleMap",
    name: "Thunderforest OpenCycleMap",
    type: "raster",
    url: `https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${env.thunderforestApiKey}`,
    attribution: "© OpenStreetMap contributors; © Thunderforest",
    projectUrl: thunderforestProjectUrl,
  },
  thunderforestOutdoors: {
    id: "thunderforestOutdoors",
    name: "Thunderforest Outdoors",
    type: "raster",
    url: `https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${env.thunderforestApiKey}`,
    attribution: "© OpenStreetMap contributors; © Thunderforest",
    projectUrl: thunderforestProjectUrl,
  },
  thunderforestAtlas: {
    id: "thunderforestAtlas",
    name: "Thunderforest Atlas",
    type: "raster",
    url: `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${env.thunderforestApiKey}`,
    attribution: "© OpenStreetMap contributors; © Thunderforest",
    projectUrl: thunderforestProjectUrl,
  },
} as const;

export const DEFAULT_SOURCE_ID = VELOMAPA_BASEMAP_KEY;
