import { Container, Text, Sprite, Loader, Graphics, Point } from "pixi.js";
import { UIConfig } from "../config";

export class UIBlock {
  container = new Container();
  constructor(private title: string, private size: Point, private pos: Point) {}

  draw(stage: Container) {
    const { container, size, pos } = this;
    container.position = pos;
    const bg = new Sprite(Loader.shared.resources.bg.texture);
    bg.scale.set(size.x / bg.width, size.y / bg.height);
    const header = new Graphics();
    header.beginFill(UIConfig.color.accent);
    header.drawRect(0, 0, size.x, 35);
    header.endFill();
    const title = new Text(this.title, UIConfig.typography);
    title.x = size.x / 2 - title.width / 2;
    title.y = 1;
    const border = new Graphics();
    border.beginFill(null, 0);
    border.lineStyle(UIConfig.borderThickness, UIConfig.color.accent, 1, 0);
    border.drawRoundedRect(0, 0, size.x, size.y, UIConfig.borderRadius);
    const mask = new Graphics();
    mask.beginFill(0x000000);
    mask.drawRoundedRect(0, 0, size.x, size.y, UIConfig.borderRadius);
    mask.endFill();
    container.addChild(mask);
    container.mask = mask;
    container.addChild(bg);
    container.addChild(border);
    container.addChild(header);
    container.addChild(title);
    stage.addChild(container);
  }
}
