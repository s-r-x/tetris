import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import * as _ from "lodash";
import { GridState } from "../../../state/Grid";

export class FigureType2 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 2;
    this.type = FigureEnum.Type_2;
    const colStart = GRID_ORIGIN - 1;
    _.range(colStart, colStart + len).forEach((col) => {
      _.range(-2, 0).forEach((row) => {
        const brick = new Brick(row, col, color);
        this.bricks.push(brick);
      });
    });
    this.rotMatrix = [_.take(this.bricks, 2), _.takeRight(this.bricks, 2)];
    this.createPreview();
  }
  rotate() {}
}
