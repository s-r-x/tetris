import { inject, injectable } from "inversify";
import { GridState } from "./Grid";
import { Figure } from "../entities/Figure/Base";
import { TYPES } from "../containers/types";
import { FigureFactory } from "../entities/Figure/Factory";
import { FIGURES_QUEUE_SIZE } from "../constants";
import * as _ from "lodash";
import { observable, action } from "mobx";

@injectable()
export class FiguresState {
  activeFigure: Figure;
  @observable figuresQueue: Figure[] = [];
  constructor(@inject(TYPES.GridState) private grid: GridState) {}

  seedFiguresQueue() {
    if (!_.isEmpty(this.figuresQueue)) {
      return;
    }
    const figures = _.range(FIGURES_QUEUE_SIZE + 1).map(() => {
      return FigureFactory.createRandomFigure(this.grid);
    });
    this.figuresQueue = _.take(figures, FIGURES_QUEUE_SIZE);
    this.activeFigure = _.last(figures);
  }

  @action
  shiftQueue() {
    this.activeFigure = this.figuresQueue.shift();
    this.figuresQueue.push(FigureFactory.createRandomFigure(this.grid));
  }
  @action
  reset() {
    this.activeFigure = undefined;
    this.figuresQueue = [];
  }
}
