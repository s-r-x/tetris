import { Container } from "pixi.js";
import { GridUI } from "./Grid";
import { ScoreUI } from "./Score";
import { QueueUI } from "./Queue";
import { GameoverMenu, GameoverConstructorArg } from "./Gameover";
import { BgUI } from "./Bg";
import { injectable, inject } from "inversify";
import { TYPES } from "../containers/types";
import { PauseUI, PauseConstructorArg } from "./Pause";
import { HomeMenu } from "./HomeMenu";
import { LevelUI } from "./Level";
import { LinesUI } from "./Lines";

@injectable()
export class UI {
  private container: Container;
  private pause: PauseUI;
  private gameoverMenu: GameoverMenu;
  constructor(
    @inject(TYPES.GridUI) private grid: GridUI,
    @inject(TYPES.ScoreUI) private score: ScoreUI,
    @inject(TYPES.BgUI) private bg: BgUI,
    @inject(TYPES.QueueUI) private queue: QueueUI,
    @inject(TYPES.LevelUI) private level: LevelUI,
    @inject(TYPES.HomeMenu) private homeMenu: HomeMenu,
    @inject(TYPES.LinesUI) private lines: LinesUI
  ) {
    this.container = new Container();
  }
  getGridStage() {
    return this.grid.container;
  }
  getBackground() {
    return this.bg.sprite;
  }
  getGridBricksStage() {
    return this.grid.bricksContainer;
  }
  draw(stage: Container) {
    this.bg.draw(stage);
    const { container } = this;
    this.grid.draw(container);
    this.score.draw(container);
    this.queue.draw(container);
    this.level.draw(container);
    this.lines.draw(container);
    stage.addChild(container);
    container.x = stage.width / 2 - container.width / 2;
    container.y = stage.height / 2 - container.height / 2;
  }
  openGameoverMenu(handlers: GameoverConstructorArg) {
    this.gameoverMenu = new GameoverMenu(handlers);
    this.gameoverMenu.draw(this.getGridStage());
  }
  closeGameoverMenu() {
    if (this.gameoverMenu) {
      this.gameoverMenu.destroy();
      this.gameoverMenu = undefined;
    }
  }
  openPauseMenu(payload: PauseConstructorArg) {
    this.pause = new PauseUI(payload);
    this.pause.draw(this.getGridStage());
  }
  showHomeMenu(onStart: Function) {
    this.homeMenu.draw(this.getGridStage());
    this.homeMenu.start(onStart);
  }
  closeHomeMenu() {
    this.homeMenu.destroy();
  }
  redrawGrid() {
    this.grid.destroy();
    this.grid.draw(this.container);
  }
  closePauseMenu() {
    if (this.pause) {
      this.pause.destroy();
      this.pause = undefined;
    }
  }
}
