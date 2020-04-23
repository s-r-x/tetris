import { Graphics } from "pixi.js";
import { CELL_SIZE } from '../../constants';
export class Cell extends Graphics {
  constructor() {
    super();
    this.lineStyle(1, 0xffffff)
    this.drawRect(0, 0, CELL_SIZE - 1, CELL_SIZE - 1);
    this.endFill();
  }
}
