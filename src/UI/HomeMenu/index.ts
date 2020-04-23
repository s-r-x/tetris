import { Container } from "pixi.js";
import { ScoreTable } from "../ScoreTable";
import { Button } from "../Button";
import { injectable, inject } from "inversify";
import { TYPES } from "../../containers/types";
import { GameState } from "../..//state/Game";
import { IReactionDisposer, autorun } from "mobx";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";

@injectable()
export class HomeMenu {
  private container: Container;
  private levelDisposer: IReactionDisposer;
  private levelBtn: Button;
  private startBtn: Button;
  constructor(@inject(TYPES.GameState) private state: GameState) {}
  onLevelChange = (level: number) => {
    this.levelBtn.updateText(`Level: ${level}`);
  };
  destroy() {
    if (this.container) {
      this.container.destroy();
    }
    if (this.levelDisposer) {
      this.levelDisposer();
    }
  }
  private onLevelClick = () => {
    this.state.nextLevel();
  };
  draw(stage: Container) {
    const container = new Container();
    const btnsContainer = new Container();
    const startBtn = new Button("Play");
    const levelBtn = new Button("Level: 1");
    startBtn.draw(btnsContainer);
    levelBtn.draw(btnsContainer);

    levelBtn.container.y = 70;
    const scoreTable = new ScoreTable();
    container.addChild(btnsContainer);
    scoreTable.draw(container);
    this.levelBtn = levelBtn;
    this.startBtn = startBtn;
    scoreTable.y = 150;
    btnsContainer.x = container.width / 2 - btnsContainer.width / 2;
    container.x =  GRID_WIDTH / 2 - container.width / 2;
    container.y = GRID_HEIGHT / 2 - container.height / 2;
    this.container = container;
    stage.addChild(container);
  }
  start(onStart: Function) {
    this.startBtn.onClick(onStart);
    this.levelBtn.onClick(this.onLevelClick);
    this.levelDisposer = autorun(() => this.onLevelChange(this.state.level));
  }
}
