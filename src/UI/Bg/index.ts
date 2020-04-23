import { Sprite, Loader, Container } from "pixi.js";
import { injectable } from "inversify";

@injectable()
export class BgUI {
  sprite: Sprite;
  constructor() {}
  draw(stage: Container) {
    const texture = Loader.shared.resources.bg_pattern.texture;
    const bg = new Sprite(texture);
    stage.addChild(bg);
    this.sprite = bg;
  }
}
