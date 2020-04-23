import { GRID_ROWS, GRID_COLS } from "../constants";
import { Brick } from "../entities/Brick";
import { Figure } from "../entities/Figure/Base";
import _ from "lodash";
import { injectable } from "inversify";

type CompletedRowMeta = {
  oneColor: boolean;
  rowIdx: number;
};
@injectable()
export class GridState {
  constructor() {
    this.createEmptyGrid();
  }
  reset() {
    this.createEmptyGrid();
  }
  private createEmptyGrid() {
    this.grid = _.range(GRID_ROWS).map(() =>
      _.range(GRID_COLS).map(() => undefined)
    );
  }
  private grid: Array<Brick[]>;
  private addFigure(figure: Figure) {
    figure.bricks.forEach((brick) => {
      if (this.grid[brick.row]) {
        this.grid[brick.row][brick.col] = brick;
      }
    });
  }
  getCell(row: number, col: number) {
    return this.grid[row] && this.grid[row][col];
  }
  private getCompletedRows() {
    return this.grid.reduce((acc, row, idx) => {
      const isRowCompleted = row[0] && row.every((brick) => brick);
      if (isRowCompleted) {
        acc.push({
          rowIdx: idx,
          oneColor: row.every((brick) => brick.color === row[0].color),
        });
      }
      return acc;
    }, [] as CompletedRowMeta[]);
  }
  handleLand(figure: Figure): CompletedRowMeta[] {
    this.addFigure(figure);
    const completedRows = this.getCompletedRows();
    const gaps = completedRows.length;
    if (gaps === 0) {
      return completedRows;
    }
    completedRows.forEach(({ rowIdx }) => {
      this.grid[rowIdx].forEach((brick, colIdx, self) => {
        brick.destroy(true);
        self[colIdx] = undefined;
      });
    });
    const upperRows = this.grid.slice(0, _.first(completedRows).rowIdx);
    _.eachRight(upperRows, (row) => {
      row.forEach((brick) => {
        if (brick) {
          brick.move(brick.row + gaps, brick.col, true);
          this.grid[brick.prevRow][brick.prevCol] = undefined;
          this.grid[brick.row][brick.col] = brick;
        }
      });
    });
    return completedRows;
  }
}
