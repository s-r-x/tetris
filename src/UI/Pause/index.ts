import { Container } from "pixi.js";
import { Button } from "../Button";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";
import { gsap } from "gsap";

export type PauseConstructorArg = {
  onResume: Function;
  onRestart: Function;
  onExit: Function;
};
export class PauseUI {
  private container: Container;
  private restartBtn: Button;
  private resumeBtn: Button;
  private exitBtn: Button;
  constructor({ onRestart, onResume, onExit }: PauseConstructorArg) {
    const container = new Container();
    const resumeBtn = new Button("Resume");
    const restartBtn = new Button("Restart");
    const exitBtn = new Button("Exit");
    this.container = container;
    this.restartBtn = restartBtn;
    this.exitBtn = exitBtn;
    this.resumeBtn = resumeBtn;
    restartBtn.draw(container);
    resumeBtn.draw(container);
    exitBtn.draw(container);
    restartBtn.onClick(onRestart);
    resumeBtn.onClick(onResume);
    exitBtn.onClick(onExit)
    restartBtn.container.y = 65;
    exitBtn.container.y = 130;
    container.x = GRID_WIDTH / 2 - container.width / 2;
    container.y = GRID_HEIGHT / 2 - container.height / 2;
    container.alpha = 0;
  }
  private tweenShow() {
    gsap.to(this.container, 0.25, {
      pixi: {
        alpha: 1,
      },
    });
  }
  private tweenHide = () =>
    new Promise((r) => {
      gsap.to(this.container, 0.25, {
        pixi: {
          alpha: 0,
        },
        onComplete: r,
      });
    });
  draw(stage: Container) {
    stage.addChild(this.container);
    this.tweenShow();
  }
  async destroy() {
    await this.tweenHide();
    this.restartBtn.destroy();
    this.resumeBtn.destroy();
    this.exitBtn.destroy();
    this.container.destroy();
  }
}
