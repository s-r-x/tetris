import { Container } from "pixi.js";
import { Brick } from "../Brick";
import { GhostBrick } from "../Brick/Ghost";
import { GridState } from "../../state/Grid";
import _ from "lodash";
import { GRID_COLS, GRID_ROWS } from "../../constants";
import { FigureEnum } from "./Variants/types";
import { rotateMatrix } from "../../helpers/math";

type BrickMatrix = Array<Brick[]>;
export abstract class Figure {
  bricks: Brick[] = [];
  preview: Container;
  protected rotMatrix: Array<Brick[]>;
  protected matrixRow: number;
  protected matrixCol: number;
  private ghostBricks: GhostBrick[] = [];
  landed = false;
  type: FigureEnum;
  constructor(protected color: string, protected gridState: GridState) {
    _.range(4).forEach(() => {
      const ghost = new GhostBrick(color);
      this.ghostBricks.push(ghost);
    });
  }
  draw(stage: Container) {
    this.updateGhost();
    this.ghostBricks.forEach((brick) => {
      stage.addChild(brick);
    });
    this.bricks.forEach((brick) => {
      stage.addChild(brick.view);
    });
  }
  protected createPreview() {
    const container = new Container();
    this.rotMatrix.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (col) {
          const brick = new Brick(rowIdx, colIdx, this.color);
          container.addChild(brick.view);
        }
      });
    });
    this.preview = container;
  }
  protected updateGhost() {
    const landingPos = this.calcLandingPos();
    this.ghostBricks.forEach((brick, idx) => {
      const pos = landingPos[idx];
      brick.move(pos.row, pos.col);
    });
  }
  freeze() {
    this.ghostBricks.forEach((brick) => {
      brick.destroy();
    });
    this.ghostBricks = [];
    this.rotMatrix = [];
  }
  protected canMoveToCell(row: number, col: number) {
    const cell = this.gridState.getCell(row, col);
    return !cell;
  }
  protected canMoveLeft() {
    const hasInvalid = this.bricks.some((brick) => {
      const col = brick.col - 1;
      const isOut = col < 0;
      if (isOut) {
        return true;
      } else {
        return !this.canMoveToCell(brick.row, col);
      }
    });
    return !hasInvalid;
  }
  moveLeft(): boolean {
    const canMove = this.canMoveLeft();
    if (canMove) {
      this.matrixCol -= 1;
      this.bricks.forEach((brick) => {
        brick.move(brick.row, brick.col - 1);
      });
      this.updateGhost();
    }
    return canMove;
  }
  protected canMoveRight() {
    const hasInvalid = this.bricks.some((brick) => {
      const col = brick.col + 1;
      const isOut = col >= GRID_COLS;
      if (isOut) {
        return true;
      } else {
        return !this.canMoveToCell(brick.row, col);
      }
    });
    return !hasInvalid;
  }
  moveRight(): boolean {
    const canMove = this.canMoveRight();
    if (canMove) {
      this.matrixCol += 1;
      this.bricks.forEach((brick) => {
        brick.move(brick.row, brick.col + 1);
      });
      this.updateGhost();
    }
    return canMove;
  }
  canMoveBottom() {
    const hasInvalid = this.bricks.some((brick) => {
      const row = brick.row + 1;
      const isOut = row >= GRID_ROWS;
      if (isOut) {
        return true;
      } else {
        return !this.canMoveToCell(row, brick.col);
      }
    });
    return !hasInvalid;
  }
  moveBottom() {
    const canMove = this.canMoveBottom();
    if (canMove) {
      this.matrixRow += 1;
      this.bricks.forEach((brick) => {
        brick.move(brick.row + 1, brick.col);
      });
    } else {
      this.landed = true;
    }
  }
  moveEnd() {
    const pos = this.calcLandingPos();
    this.bricks.forEach((brick, idx) => {
      brick.move(pos[idx].row, pos[idx].col);
    });
    this.landed = true;
  }
  private calcLandingPos() {
    const initialCoords = this.bricks.map(({ row, col, prevRow, prevCol }) => ({
      row,
      col,
      prevRow,
      prevCol,
    }));
    while (true) {
      if (this.canMoveBottom()) {
        this.bricks.forEach((brick) => {
          brick.move(brick.row + 1, brick.col);
        });
      } else {
        break;
      }
    }
    const coords = this.bricks.map(({ row, col }) => ({ row, col }));
    this.bricks.forEach((brick, idx) => {
      const pos = initialCoords[idx];
      brick.prevCol = pos.prevCol;
      brick.prevRow = pos.prevRow;
      brick.move(pos.row, pos.col);
    });
    return coords;
  }
  private isValidMatrix(matrix: BrickMatrix): boolean {
    return matrix.every((row, rowIdx) => {
      return row.every((brick, colIdx) => {
        if (!brick) {
          return true;
        }
        const row = this.matrixRow + rowIdx;
        const col = this.matrixCol + colIdx;
        return (
          row < GRID_ROWS &&
          col < GRID_COLS &&
          col >= 0 &&
          this.canMoveToCell(row, col)
        );
      });
    });
  }
  rotate() {
    let matrix: BrickMatrix;
    const { matrixCol: initCol } = this;
    const permutations = [
      () => (matrix = rotateMatrix(this.rotMatrix)),
      () => (this.matrixCol = initCol + 1),
      () => (this.matrixCol = initCol - 1),
    ];
    for (let idx = 0; idx < permutations.length; idx++) {
      permutations[idx]();
      if (this.isValidMatrix(matrix)) {
        matrix.forEach((row, rowIdx) => {
          row.forEach((brick, colIdx) => {
            const row = this.matrixRow + rowIdx;
            const col = this.matrixCol + colIdx;
            if (brick) {
              brick.move(row, col);
            }
          });
        });
        this.rotMatrix = matrix;
        this.updateGhost();
        return;
      }
    }
    this.matrixCol = initCol;
  }
}
