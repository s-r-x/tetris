import { Loader, Sprite } from "pixi.js";
export class BrickView extends Sprite {
  constructor(color: string) {
    const { texture } = Loader.shared.resources[color];
    super(texture);
  }
}
