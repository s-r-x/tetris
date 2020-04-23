import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GridState } from "../../../state/Grid";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import * as _ from "lodash";

export class FigureType1 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 4;
    this.type = FigureEnum.Type_1;
    const colStart = GRID_ORIGIN - 2;
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [undefined, undefined, undefined, undefined],
      this.bricks,
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ];
    this.matrixCol = colStart;
    this.matrixRow = -2;
    this.createPreview();
  }
}
