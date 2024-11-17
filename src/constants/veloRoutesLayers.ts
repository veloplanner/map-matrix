import type {
  LineLayerSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";

type VeloRouteId = "lcn" | "rcn" | "ncn" | "icn";
const VELO_ROUTES_SOURCE_ID = "velo_routes";

const COLORS: Record<VeloRouteId, string> = {
  lcn: "orange",
  rcn: "green",
  ncn: "blue",
  icn: "red",
};

const VELO_ROUTES_LAYERS: {
  id: VeloRouteId;
  sourceLayer: string;
  minZoom?: number;
}[] = [
  {
    id: "lcn",
    sourceLayer: "velo_routes_lcn_and_unknown",
    minZoom: 8,
  },
  {
    id: "rcn",
    sourceLayer: "velo_routes_rcn",
    minZoom: 7,
  },
  {
    id: "ncn",
    sourceLayer: "velo_routes_ncn",
  },
  {
    id: "icn",
    sourceLayer: "velo_routes_icn",
  },
];

const VELO_ROUTE_LAYERS: LineLayerSpecification[] = VELO_ROUTES_LAYERS.map(
  (layer) => ({
    id: layer.id,
    source: VELO_ROUTES_SOURCE_ID,
    "source-layer": layer.sourceLayer,
    type: "line",
    ...(layer.minZoom ? { minzoom: layer.minZoom } : {}),
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": COLORS[layer.id],
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        ["case", ["boolean", ["feature-state", "active"], false], 1, 0.5],
        4,
        ["case", ["boolean", ["feature-state", "active"], false], 3, 1],
        5,
        ["case", ["boolean", ["feature-state", "active"], false], 5, 2],
        // At zoom 5, it stops interpolating and maintains the same width until zoom 14
        5.1,
        ["case", ["boolean", ["feature-state", "active"], false], 5, 2],
        13.9,
        ["case", ["boolean", ["feature-state", "active"], false], 5, 2],
        // At zoom 14, it jumps to the new width
        14,
        ["case", ["boolean", ["feature-state", "active"], false], 6, 3.5],
      ],
    },
  })
);

const VELO_ROUTES_TEXT_LAYERS: SymbolLayerSpecification[] =
  VELO_ROUTES_LAYERS.map((layer) => ({
    id: `velo_routes_${layer.id}_text`,
    type: "symbol",
    source: VELO_ROUTES_SOURCE_ID,
    "source-layer": layer.sourceLayer,
    minzoom: 13,
    layout: {
      "symbol-placement": "line",
      "symbol-spacing": 400,
      "text-field": ["coalesce", ["get", "name"], ["get", "ref"]],
      "text-font": ["Noto Sans Regular"],
      "text-size": 14,
      "text-anchor": "center",
      "text-offset": [0, -1.1],
      "text-allow-overlap": false,
      "text-ignore-placement": false,
    },
    paint: {
      "text-color": COLORS[layer.id],
      "text-halo-color": "white",
      "text-halo-width": 1,
    },
  }));

export const VELO_ROUTES_OVERLAY = {
  sourceId: VELO_ROUTES_SOURCE_ID,
  url: "https://services.velomapa.pl/tiles/velo_routes",
  layers: [...VELO_ROUTE_LAYERS, ...VELO_ROUTES_TEXT_LAYERS],
};
