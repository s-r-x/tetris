import { observable, action } from "mobx";
import { injectable } from "inversify";
import _ from "lodash";
import fp from "lodash/fp";
import { Storage } from "../helpers/storage";

const config = {
  perDrop: 10,
  perLine: 100,
  perComboLine: 200,
};
type ScoreHistoryItem = {
  date: string;
  score: number;
};
type UpdateScoreMeta = {
  completedRows: number;
  oneColorRows: number;
  level: number;
};
@injectable()
export class ScoreState {
  private MAX_SCORE_HISTORY = 5;
  @observable score = 0;
  @observable lines = 0;

  @action
  incScore(points: number) {
    this.score += points;
  }
  @action
  updateScore(meta: UpdateScoreMeta) {
    let acc = 0;

    acc += config.perDrop;
    let linesScore = 0;
    if (meta.completedRows) {
      linesScore += (meta.completedRows - meta.oneColorRows) * config.perLine;
    }
    if (meta.oneColorRows) {
      linesScore += meta.oneColorRows * config.perComboLine;
    }
    linesScore *= meta.level;

    acc += linesScore;
    this.incScore(acc);
  }
  @action
  reset() {
    this.score = 0;
    this.lines = 0;
  }

  saveScore() {
    const newHistory: ScoreHistoryItem[] = fp.compose(
      fp.take(this.MAX_SCORE_HISTORY),
      fp.orderBy("score", "desc"),
      fp.uniqBy("score"),
      fp.concat({
        score: this.score,
        date: new Date().toISOString(),
      })
    )(Storage.get("score") || []);
    Storage.set("score", newHistory);
  }
}
