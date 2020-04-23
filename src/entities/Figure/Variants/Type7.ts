import { FigureEnum } from "./types";
import { Figure } from "../Base";
import { GridState } from "../../../state/Grid";
import { GRID_ORIGIN } from "../../../constants";
import { Brick } from "../../Brick";
import _ from "lodash";

export class FigureType7 extends Figure {
  constructor(color: string, gridState: GridState) {
    super(color, gridState);
    const len = 2;
    this.type = FigureEnum.Type_7;
    const colStart = GRID_ORIGIN - 1;
    this.bricks.push(new Brick(-2, colStart, color));
    this.bricks.push(new Brick(-2, colStart +1, color));
    _.range(colStart, colStart + len).forEach((col) => {
      const brick = new Brick(-1, col-1, color);
      this.bricks.push(brick);
    });
    this.rotMatrix = [
      [undefined, this.bricks[0], this.bricks[1]],
      [this.bricks[2], this.bricks[3], undefined],
      [undefined, undefined, undefined],
    ];
    this.matrixCol = colStart - 1;
    this.matrixRow = -3;

    this.createPreview();
  }
}

