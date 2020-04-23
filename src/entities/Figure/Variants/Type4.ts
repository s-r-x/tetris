import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import * as _ from "lodash";
import { GridState } from "../../../state/Grid";

export class FigureType4 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 3;
    this.type = FigureEnum.Type_4;
    const colStart = GRID_ORIGIN - 1;
    this.bricks.push(new Brick(-2, colStart + 1, color));
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [undefined, this.bricks[0], undefined],
      this.bricks.slice(1),
      [undefined, undefined, undefined],
    ];
    this.matrixCol = colStart;
    this.matrixRow = -2;

    this.createPreview();

  }
}
