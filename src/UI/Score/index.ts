import { Container, Text } from "pixi.js";
import { ScoreState } from "../../state/Score";
import { UIConfig } from "../config";
import { autorun, IReactionDisposer } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../containers/types";
import { gsap } from "gsap";
import { UIBlock } from "../Block";

@injectable()
export class ScoreUI {
  private container: Container;
  private disposer: IReactionDisposer;
  private textObject: Text;
  constructor(@inject(TYPES.ScoreState) private state: ScoreState) {}
  private onScoreChange = (score: number) => {
    const text = this.textObject;
    gsap.to(text, 0.25, {
      text: score,
      roundProps: "text",
      onComplete() {
        text.x = text.parent.parent.width / 2 - text.width / 2;
      },
    });
  };
  destroy() {
    this.container.destroy();
    this.disposer();
  }
  draw(stage: Container) {
    const layout = UIConfig.layout.score;
    const block = new UIBlock("Score", layout.size, layout.coords);
    const container = new Container();
    const text = new Text("0", UIConfig.typography);
    text.y = 40;
    text.x = layout.size.x / 2 - text.width / 2;

    this.textObject = text;
    container.addChild(text);

    block.draw(stage);
    block.container.addChild(container);
    this.container = container;
    this.disposer = autorun(() => this.onScoreChange(this.state.score));
  }
}
