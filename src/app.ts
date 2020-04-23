import { loadAssets } from "./loader";
import { TICK_INTERVALS } from "./constants";
import { GameState } from "./state/Game";
import { GameControls } from "./controls";
import { TYPES } from "./containers/types";
import { injectable, inject } from "inversify";
import { Renderer, Stage } from "./Renderer";
import { Ticker } from "pixi.js";
import { UI } from "./UI";
import _ from "lodash";

@injectable()
export class App {
  private tickerId: number;
  private keyTicker: Ticker;
  constructor(
    @inject(TYPES.GameState) private state: GameState,
    @inject(TYPES.GameControls) private controls: GameControls,
    @inject(TYPES.Renderer) private renderer: Renderer,
    @inject(TYPES.Stage) private stage: Stage,
    @inject(TYPES.UI) private ui: UI
  ) {
    this.keyTicker = new Ticker();
    this.keyTicker.maxFPS = 25;
    window.addEventListener("resize", this.onResize);
  }
  private onResize = () => {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    this.stage.x = window.innerWidth / 2 - this.stage.width / 2;
    this.stage.y = window.innerHeight / 2 - this.stage.height / 2;
  };
  private spawnFigure() {
    const stage = this.ui.getGridBricksStage();
    this.state.figure.shiftQueue();
    const figure = this.state.figure.activeFigure;
    figure.draw(stage);
  }
  private bottomTick = () => {
    if (this.state.paused || this.state.gameover) return;
    this.moveFigureBottom();
  };
  private moveFigureBottom(toEnd = false) {
    const { activeFigure: figure } = this.state.figure;
    if (toEnd) {
      figure.moveEnd();
    } else {
      figure.moveBottom();
    }
    if (figure.landed) {
      this.onLand();
    }
  }
  private onLand() {
    const { activeFigure: figure } = this.state.figure;
    figure.freeze();
    const meta = this.state.grid.handleLand(figure);
    this.state.score.updateScore({
      completedRows: meta.length,
      oneColorRows: _.sumBy(meta, (a) => (a.oneColor ? 1 : 0)),
      level: this.state.level,
    });
    if (this.state.checkIsOver()) {
      this.endGame();
    } else {
      this.spawnFigure();
    }
  }
  private startBottomTicker() {
    this.tickerId = setInterval(
      this.bottomTick,
      TICK_INTERVALS[this.state.level]
    );
  }
  private stopBottomTicker() {
    if (this.tickerId) {
      clearInterval(this.tickerId);
      this.tickerId = undefined;
    }
  }
  private stopKeyTicker() {
    this.keyTicker.remove(this.keyTick);
    this.keyTicker.stop();
  }
  keyTick = () => {
    const i = this.state.interactive;
    const { pressedKeys: keys } = this.controls.keyboard;
    if (keys.has("ArrowDown")) {
      if (i) {
        this.moveFigureBottom();
      }
      if (this.tickerId) {
        this.stopBottomTicker();
      }
    }
    if (keys.has("ArrowLeft")) {
      if (i) {
        this.state.figure.activeFigure.moveLeft();
      }
    }
    if (keys.has("ArrowRight")) {
      if (i) {
        this.state.figure.activeFigure.moveRight();
      }
    }
  };
  private tick = () => {
    this.renderer.render(this.stage);
    const { pressedKeys } = this.controls.keyboard;
    if (!this.state.interactive) return;
    if (pressedKeys.size === 0 && !this.tickerId) {
      this.startBottomTicker();
    }
  };
  private onResume = () => {
    this.state.paused = false;
    this.ui.closePauseMenu();
  };
  private onRestart = () => {
    this.state.reset();
    this.stopKeyTicker();
    this.ui.closePauseMenu();
    this.ui.closeGameoverMenu();
    this.controls.reset();
    this.ui.redrawGrid();
    this.start();
  };
  private onExit = () => {
    this.state.reset();
    this.stopBottomTicker();
    this.stopKeyTicker();
    this.ui.closePauseMenu();
    this.ui.closeGameoverMenu();
    this.controls.reset();
    this.ui.redrawGrid();
    this.ui.showHomeMenu(this.start);
  };
  private endGame() {
    this.state.score.saveScore();
    this.stopBottomTicker();
    this.stopKeyTicker();
    this.state.over();
    this.controls.reset();
    this.ui.openGameoverMenu({
      onRestart: this.onRestart,
      onExit: this.onExit,
    });
  }
  private togglePause() {
    this.state.togglePause();
    if (this.state.paused) {
      this.ui.openPauseMenu({
        onResume: this.onResume,
        onRestart: this.onRestart,
        onExit: this.onExit,
      });
    } else {
      this.ui.closePauseMenu();
    }
  }
  private putMappings() {
    this.controls.keyboard.putKeyDownMappings({
      ArrowDown: () => {
        if (this.state.interactive) {
          this.moveFigureBottom();
        }
        if (this.tickerId) {
          this.stopBottomTicker();
        }
      },
      ArrowLeft: () => {
        if (this.state.interactive) {
          this.state.figure.activeFigure.moveLeft();
        }
      },
      ArrowRight: () => {
        if (this.state.interactive) {
          this.state.figure.activeFigure.moveRight();
        }
      },
      " ": () => {
        if (this.state.paused) {
          this.togglePause();
        } else {
          this.moveFigureBottom(true);
        }
      },
    });
    this.controls.keyboard.putKeyUpMappings({
      Escape: () => {
        this.togglePause();
      },
      ArrowUp: () => {
        if (this.state.interactive) {
          this.state.figure.activeFigure.rotate();
        }
      },
    });
  }
  async load() {
    document.body.appendChild(this.renderer.view);
    await loadAssets();
    Ticker.shared.add(this.tick);
    this.ui.draw(this.stage);
    this.ui.showHomeMenu(this.start);
    this.onResize();
  }
  private start = () => {
    this.ui.closeHomeMenu();
    this.state.figure.seedFiguresQueue();
    this.state.active = true;
    this.spawnFigure();
    this.putMappings();
    this.keyTicker.add(this.keyTick);
    this.keyTicker.start();
  };
}
