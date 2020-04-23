import {
  TilingSprite,
  Renderer,
  Container,
  Sprite,
  Loader,
  Graphics,
} from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH } from "../../constants";
import { Cell } from "./Cell";
import { GameState } from "../../state/Game";
import { inject, injectable } from "inversify";
import { TYPES } from "../../containers/types";
import { UIConfig } from "../config";
import { reaction } from "mobx";
import { gsap } from "gsap";

class Cells extends TilingSprite {
  constructor(renderer: Renderer) {
    const cell = new Cell();
    const texture = renderer.generateTexture(cell, 1, 1);
    super(texture, GRID_WIDTH, GRID_HEIGHT);
  }
}

@injectable()
export class GridUI {
  container: Container;
  bricksContainer: Container;
  private overlay: Graphics;
  constructor(
    @inject(TYPES.Renderer) private renderer: Renderer,
    @inject(TYPES.GameState) private state: GameState
  ) {}
  private toggleOverlay = (hide: boolean) => {
    gsap.to(this.overlay, 0.25, {
      pixi: {
        alpha: hide ? 0 : 1,
      },
    });
  };
  draw(stage: Container) {
    const bg = new Sprite(Loader.shared.resources.bg.texture);
    bg.scale.set(0.5, 0.5);
    const cells = new Cells(this.renderer);
    const container = new Container();
    this.container = container;
    container.addChild(bg);
    container.addChild(cells);
    const g = new Graphics();
    g.beginFill(0x000000);
    g.drawRoundedRect(
      0,
      0,
      container.width,
      container.height,
      UIConfig.borderRadius
    );
    const border = new Graphics();
    border.beginFill(null, 0);
    border.lineStyle(5, UIConfig.color.accent, 1, .85);
    border.drawRoundedRect(
      0,
      0,
      container.width,
      container.height,
      UIConfig.borderRadius
    );
    const overlay = new Graphics();
    overlay.beginFill(0x000000, 0.85);
    overlay.drawRect(0, 0, container.width, container.height);
    this.overlay = overlay;
    const bricksContainer = new Container();
    this.bricksContainer = bricksContainer;
    container.addChild(bricksContainer);
    container.addChild(overlay);
    //container.addChild(g);
    container.addChild(border);
    //container.mask = g;
    bricksContainer.addChild(g);
    bricksContainer.mask = g;
    container.x = UIConfig.layout.grid.coords.x;
    container.y = UIConfig.layout.grid.coords.y;
    stage.addChild(container);
    reaction(() => this.state.interactive, this.toggleOverlay);
  }
  destroy() {
    this.container.destroy();
  }
}
