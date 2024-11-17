import { BoxCount } from "../types";

type GridConfig = {
  cols: string;
  rows: string;
};

export const GRID_LAYOUTS: Record<number, GridConfig> = {
  1: {
    cols: "grid-cols-1",
    rows: "grid-rows-1",
  },
  2: {
    cols: "grid-cols-2",
    rows: "grid-rows-1",
  },
  3: {
    cols: "grid-cols-3", // Three maps in a row
    rows: "grid-rows-1",
  },
  4: {
    cols: "grid-cols-2",
    rows: "grid-rows-2",
  },
  5: {
    cols: "grid-cols-3", // 3 maps on top, 2 below
    rows: "grid-rows-2",
  },
  6: {
    cols: "grid-cols-3", // 3x2 grid
    rows: "grid-rows-2",
  },
} as const;

export const AVAILABLE_LAYOUTS: BoxCount[] = Object.keys(GRID_LAYOUTS).map(
  Number
) as BoxCount[];
