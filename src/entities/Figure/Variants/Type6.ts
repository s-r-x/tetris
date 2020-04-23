import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GridState } from "../../../state/Grid";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import _ from "lodash";

export class FigureType6 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 3;
    this.type = FigureEnum.Type_6;
    const colStart = GRID_ORIGIN - 1;
    this.bricks.push(new Brick(-2, colStart + 2, color));
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [undefined, undefined, this.bricks[0]],
      this.bricks.slice(1),
      [undefined, undefined, undefined],
    ];
    this.matrixCol = colStart;
    this.matrixRow = -2;
    this.createPreview();
  }
}

