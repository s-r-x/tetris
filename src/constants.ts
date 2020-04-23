export const CELL_SIZE = 25;
export const GRID_WIDTH = 250;
export const GRID_HEIGHT = 500;
export const GRID_ROWS = GRID_HEIGHT / CELL_SIZE;
export const GRID_COLS = GRID_WIDTH / CELL_SIZE;
export const GRID_ORIGIN = GRID_COLS / 2;

export const TICK_INTERVALS = {
  1: 500,
  2: 400,
  3: 300,
  4: 200,
  5: 100,
};
export const FIGURES_QUEUE_SIZE = 3;

export const RENDERER_CONFIG = {
  width: window.innerWidth,
  height: window.innerHeight,
  view: document.querySelector("#canvas") as HTMLCanvasElement,
  transparent: true,
  resolution: window.devicePixelRatio,
  antialias: true,
  autoDensity: true,
};
