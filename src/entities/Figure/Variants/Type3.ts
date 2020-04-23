import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GridState } from "../../../state/Grid";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import * as _ from "lodash";

export class FigureType3 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 3;
    this.type = FigureEnum.Type_3;
    const colStart = GRID_ORIGIN - 1;
    this.bricks.push(new Brick(-2, colStart, color));
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [this.bricks[0], undefined, undefined],
      this.bricks.slice(1),
      [undefined, undefined, undefined],
    ];
    this.matrixCol = colStart;
    this.matrixRow = -2;
    this.createPreview();
  }
}
