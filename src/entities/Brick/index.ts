import { BrickView } from "./view";
import { CELL_SIZE } from "../../constants";
import { gsap } from "gsap";
import { GlowFilter } from 'pixi-filters';

const filter = new GlowFilter();
export class Brick {
  view: BrickView;
  prevRow: number;
  prevCol: number;
  row: number;
  col: number;
  color: string;
  constructor(row: number, col: number, color: string) {
    this.prevRow = row;
    this.prevCol = col;
    this.row = row;
    this.col = col;
    this.color = color;
    this.view = new BrickView(color);
    this.view.x = CELL_SIZE * col;
    this.view.y = CELL_SIZE * row;
  }
  private tweenMove() {
    gsap.to(this.view, 0.3, {
      pixi: {
        x: this.col * CELL_SIZE,
        y: this.row * CELL_SIZE,
      },
    });
  }
  move(row: number, col: number, tween = false) {
    this.prevCol = this.col;
    this.prevRow = this.row;
    this.row = row;
    this.col = col;
    if (tween) {
      this.tweenMove();
    } else {
      this.view.x = col * CELL_SIZE;
      this.view.y = row * CELL_SIZE;
    }
  }
  private tweenDestroy() {
    const { view } = this;
    view.filters = [filter];
    gsap.to(view, 0.25, {
      pixi: {
        alpha: 0,
      },
      onComplete() {
        view.destroy();
      },
    });
  }
  destroy(tween = false) {
    if (tween) {
      this.tweenDestroy();
    } else {
      this.view.destroy();
    }
  }
}
