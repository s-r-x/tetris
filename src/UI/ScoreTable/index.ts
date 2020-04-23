import { Container, Text, Graphics } from "pixi.js";
import { Storage } from "../../helpers/storage";
import _ from "lodash";
import { UIConfig } from "../config";
import day from "dayjs";

type ScoreHistoryItem = {
  date: string;
  score: number;
};
export class ScoreTable extends Container {
  private scores: ScoreHistoryItem[];
  constructor() {
    super();
    this.scores = Storage.get("score") || [];
  }
  draw(stage: Container) {
    const rowStyle = {
      ...UIConfig.typography,
      fontSize: 22,
    };
    const title = new Text("High Scores", UIConfig.typography);
    const table = new Container();
    table.y = 40;
    this.scores.forEach(({ score, date }, idx) => {
      const row = new Container();
      const scoreText = new Text(score.toString(), rowStyle);
      const dateText = new Text(day(date).format("YYYY-MM-DD"), rowStyle);
      dateText.x = 90;
      row.addChild(dateText);
      row.addChild(scoreText);
      row.y = idx * 35;
      table.addChild(row);
    });

    this.addChild(title);
    this.addChild(table);

    stage.addChild(this);
    title.x = this.width / 2 - title.width / 2;
    this.x = stage.width / 2 - this.width / 2;
  }
}
