import { Container, Loader, Sprite, Text } from "pixi.js";
import { UIConfig } from "../config";

export class Button {
  container: Container;
  private button: Sprite;
  private text: Text;
  private clickListener: Function;
  constructor(content: string) {
    const container = new Container();
    container.buttonMode = true;
    container.interactive = true;
    const resources = Loader.shared.resources;
    const button = new Sprite(resources.button.texture);
    const text = new Text(content, {
      ...UIConfig.typography,
      fill: 0xffffff,
      fontSize: 32,
    });
    this.container = container;
    this.button = button;
    this.text = text;
    text.x = button.width / 2 - text.width / 2;
    text.y = button.height / 2 - text.height / 2;
    container.addChild(button);
    container.addChild(text);
    container.on("pointerover", this.onPointerOver);
    container.on("pointerout", this.onPointerOut);
    container.on("pointerdown", this.onPointerDown);
    container.on("pointerup", this.onPointerUp);
  }
  onClick(handler: Function) {
    if (this.clickListener) {
      this.container.off("pointerup", this.clickListener);
    }
    this.container.on("pointerup", handler);
  }
  draw(stage: Container) {
    stage.addChild(this.container);
  }
  destroy() {
    this.container.off("pointerover", this.onPointerOver);
    this.container.off("pointerout", this.onPointerOut);
    this.container.destroy();
  }
  private onPointerDown = () => {
    this.button.alpha = 0.8;
  };
  private onPointerUp = () => {
    this.button.alpha = 1;
  };
  private onPointerOver = () => {
    this.button.texture = Loader.shared.resources.button_active.texture;
  };
  private onPointerOut = () => {
    this.button.texture = Loader.shared.resources.button.texture;
    this.button.alpha = 1;
  };
  updateText(content: string) {
    const { text, button } = this;
    text.text = content;
    text.x = button.width / 2 - text.width / 2;
    text.y = button.height / 2 - text.height / 2;
  }
}
