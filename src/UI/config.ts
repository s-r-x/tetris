import { Point } from "pixi.js";
import { GRID_WIDTH } from "../constants";

const THIRD_COL_X = GRID_WIDTH + 20 + 235;
export const UIConfig = {
  typography: {
    fontFamily: "Pribambas",
    fill: 0xffffff,
    fontSize: 27,
  },
  borderRadius: 9,
  borderThickness: 5,
  color: {
    accent: 0x2e2f5b,
  },
  layout: {
    score: {
      coords: new Point(THIRD_COL_X, 0),
      size: new Point(225, 80),
    },
    grid: {
      coords: new Point(240, 4),
    },
    queue: {
      coords: new Point(0, 0),
      size: new Point(225, 280),
    },
    level: {
      coords: new Point(THIRD_COL_X, 90),
      size: new Point(225, 80),
    },
    lines: {
      coords: new Point(THIRD_COL_X, 180),
      size: new Point(225, 80),
    },
  },
};
