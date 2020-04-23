import { Keyboard } from "./Keyboard";
import { inject, injectable } from "inversify";
import { TYPES } from "../containers/types";

@injectable()
export class GameControls {
  constructor(@inject(TYPES.Keyboard) public keyboard: Keyboard) {}
  reset() {
    this.keyboard.resetMappings();
  }
}
