import { BoxCount } from "../types";

type GridConfig = {
  cols: string;
  rows: string;
  areas: string[];
};

export const GRID_LAYOUTS: Record<number, GridConfig> = {
  1: {
    cols: "grid-cols-1",
    rows: "grid-rows-1",
    areas: ["a"],
  },
  2: {
    cols: "grid-cols-2",
    rows: "grid-rows-1",
    areas: ["a", "b"],
  },
  3: {
    cols: "grid-cols-2",
    rows: "grid-rows-2",
    areas: ["a a", "b c"],
  },
  4: {
    cols: "grid-cols-2",
    rows: "grid-rows-2",
    areas: ["a b", "c d"],
  },
  5: {
    cols: "grid-cols-3",
    rows: "grid-rows-2",
    areas: ["a a b", "c d e"],
  },
  6: {
    cols: "grid-cols-3",
    rows: "grid-rows-2",
    areas: ["a b c", "d e f"],
  },
} as const;

export const AVAILABLE_LAYOUTS: BoxCount[] = Object.keys(GRID_LAYOUTS).map(
  Number
) as BoxCount[];
