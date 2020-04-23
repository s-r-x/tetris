import { inject, injectable } from "inversify";
import { GridState } from "./Grid";
import { ScoreState } from "./Score";
import { FiguresState } from "./Figures";
import { TYPES } from "../containers/types";
import { observable, computed, action } from "mobx";
import _ from "lodash";

@injectable()
export class GameState {
  private LEVELS = [1, 2, 3, 4, 5];
  @observable paused = false;
  @observable gameover = false;
  @observable active = false;
  @observable level = 1;
  @computed get interactive() {
    return this.active && !this.paused && !this.gameover;
  }
  constructor(
    @inject(TYPES.GridState) public grid: GridState,
    @inject(TYPES.ScoreState) public score: ScoreState,
    @inject(TYPES.FiguresState) public figure: FiguresState
  ) {}

  @action
  changeLevel(level: number) {
    this.level = level;
  }
  @action
  nextLevel() {
    const currIdx = this.LEVELS.findIndex((l) => l === this.level);
    const nextIdx = currIdx + 1;
    if (nextIdx in this.LEVELS) {
      this.changeLevel(this.LEVELS[nextIdx]);
    } else {
      this.changeLevel(_.first(this.LEVELS));
    }
  }
  togglePause() {
    this.paused = !this.paused;
  }
  checkIsOver() {
    const { activeFigure: figure } = this.figure;
    return figure && figure.bricks.some(({ row }) => row < 0);
  }
  reset() {
    this.score.reset();
    this.grid.reset();
    this.figure.reset();
    this.gameover = false;
    this.active = false;
    this.paused = false;
  }
  over() {
    this.gameover = true;
    this.active = false;
  }
}
