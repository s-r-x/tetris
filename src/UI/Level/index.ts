import { Container, Text } from "pixi.js";
import { GameState } from "../../state/Game";
import { UIConfig } from "../config";
import { autorun, IReactionDisposer } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../containers/types";
import { UIBlock } from "../Block";

@injectable()
export class LevelUI {
  private textObject: Text;
  private container: Container;
  private disposer: IReactionDisposer;
  constructor(@inject(TYPES.GameState) private state: GameState) {}
  private onLevelChange = (level: number) => {
    const text = this.textObject;
    text.text = level.toString();
    text.x = text.parent.parent.width / 2 - text.width / 2;
  };
  destroy() {
    this.disposer();
    this.container.destroy();
  }
  draw(stage: Container) {
    const layout = UIConfig.layout.level;
    const block = new UIBlock("Level", layout.size, layout.coords);
    const container = new Container();
    this.container = container;
    const text = new Text("1", UIConfig.typography);
    text.y = 40;
    text.x = layout.size.x / 2 - text.width / 2;

    this.textObject = text;
    container.addChild(text);

    block.draw(stage);
    block.container.addChild(container);
    this.disposer = autorun(() => this.onLevelChange(this.state.level));
  }
}
