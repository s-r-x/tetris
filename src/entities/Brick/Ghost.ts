import { Loader, Sprite } from "pixi.js";
import { CELL_SIZE } from "../../constants";

export class GhostBrick extends Sprite {
  row: number;
  col: number;
  constructor(color: string) {
    const { texture } = Loader.shared.resources[color];
    super(texture);
    this.alpha = 0.5;
  }
  move(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.x = col * CELL_SIZE;
    this.y = row * CELL_SIZE;
  }
}
