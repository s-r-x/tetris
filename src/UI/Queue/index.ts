import { Container } from "pixi.js";
import { UIConfig } from "../config";
import { reaction } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../containers/types";
import { FiguresState } from "../../state/Figures";
import { Figure } from "../../entities/Figure/Base";
import { DropShadowFilter } from "pixi-filters";
import { UIBlock } from "../Block";

@injectable()
export class QueueUI {
  private shadowFilter = new DropShadowFilter();
  private container: Container;
  constructor(@inject(TYPES.FiguresState) state: FiguresState) {
    this.container = new Container();
    reaction(
      () => state.figuresQueue.map((figure) => figure),
      this.onFiguresQueueChange
    );
  }
  onFiguresQueueChange = async (figures: Figure[]) => {
    const { container } = this;
    while (container.children.length !== 0) {
      container.removeChild(container.children[0]);
    }
    let offset = 0;
    figures.forEach((figure) => {
      offset += figure.preview.height + 20;
      figure.preview.y = offset;
      container.addChild(figure.preview);
      figure.preview.filters = [this.shadowFilter];
    });
    figures.forEach((figure) => {
      figure.preview.x = container.width / 2 - figure.preview.width / 2;
    });
    container.x = container.parent.width / 2 - container.width / 2;
  };
  draw(stage: Container) {
    const { container } = this;
    const layout = UIConfig.layout.queue;
    const block = new UIBlock("Queue", layout.size, layout.coords);
    block.draw(stage);
    block.container.addChild(container);
  }
}
