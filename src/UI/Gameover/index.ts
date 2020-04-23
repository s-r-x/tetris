import { Container, Text } from "pixi.js";
import { Button } from "../Button";
import { UIConfig } from "../config";
import { ScoreTable } from "../ScoreTable";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";

export type GameoverConstructorArg = {
  onRestart: Function;
  onExit: Function;
};
export class GameoverMenu {
  private container: Container;
  constructor(private handlers: GameoverConstructorArg) {}
  draw(stage: Container) {
    const container = new Container();
    this.container = container;
    const title = new Text("Game over", UIConfig.typography);
    const restartBtn = new Button("Restart");
    const exitBtn = new Button("Exit");
    const btnsContainer = new Container();
    const scoreTable = new ScoreTable();

    restartBtn.draw(btnsContainer);
    exitBtn.draw(btnsContainer);
    restartBtn.container.y = 50;
    exitBtn.container.y = 120;
    container.addChild(title);
    container.addChild(btnsContainer);
    scoreTable.draw(container);
    scoreTable.y = 195;

    stage.addChild(container);
    container.x = GRID_WIDTH / 2 - container.width / 2;
    container.y = GRID_HEIGHT / 2 - container.height / 2;
    title.x = container.width / 2 - title.width / 2;
    btnsContainer.x = container.width / 2 - btnsContainer.width / 2;

    restartBtn.onClick(this.handlers.onRestart);
    exitBtn.onClick(this.handlers.onExit);
  }
  destroy() {
    if (this.container) {
      this.container.destroy();
    }
  }
}
