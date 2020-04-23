import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GridState } from "../../../state/Grid";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import * as _ from "lodash";

export class FigureType5 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 2;
    this.type = FigureEnum.Type_5;
    const colStart = GRID_ORIGIN - 1;
    this.bricks.push(new Brick(-2, colStart - 1, color));
    this.bricks.push(new Brick(-2, colStart, color));
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [this.bricks[0], this.bricks[1], undefined],
      [undefined, this.bricks[2], this.bricks[3]],
      [undefined, undefined, undefined],
    ];
    this.matrixCol = colStart - 1;
    this.matrixRow = -3;

    this.createPreview();
  }
}
