import { injectable } from "inversify";

type Mapping = { [key: string]: Function };
@injectable()
export class Keyboard {
  private delay = 125;
  private keysToDelay = new Set(["ArrowLeft", "ArrowRight"]);
  pressedKeys = new Set();
  prePressedKeys: {
    [key: string]: {
      timeoutId: number;
    };
  } = {};
  private keyUpMappings: Mapping = {};
  private keyDownMappings: Mapping = {};
  private onPrePressedTimeout = (key: string) => {
    const meta = this.prePressedKeys[key];
    if (meta) {
      this.pressedKeys.add(key);
    }
    this.removePrePressedMeta(key);
  };
  private addPrePressedMeta(key: string) {
    const meta = this.prePressedKeys[key];
    if (meta) {
      this.removePrePressedMeta(key);
    }
    this.prePressedKeys[key] = {
      timeoutId: setTimeout(() => this.onPrePressedTimeout(key), this.delay),
    };
  }
  private removePrePressedMeta(key: string) {
    const meta = this.prePressedKeys[key];
    if (meta) {
      clearTimeout(meta.timeoutId);
      delete this.prePressedKeys[key];
    }
  }
  private onKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    if (this.pressedKeys.has(key)) {
      return;
    }
    if (this.keysToDelay.has(key)) {
      this.addPrePressedMeta(key);
    } else {
      this.pressedKeys.add(key);
    }
    const handler = this.keyDownMappings[key];
    if (handler) {
      handler();
    }
  };
  private onKeyUp = ({ key }: KeyboardEvent) => {
    this.pressedKeys.delete(key);
    if (key in this.prePressedKeys) {
      this.removePrePressedMeta(key);
    }
    const handler = this.keyUpMappings[key];
    if (handler) {
      handler();
    }
  };
  constructor() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }
  putKeyUpMappings(mappings: Mapping) {
    this.keyUpMappings = mappings;
  }
  putKeyDownMappings(mappings: Mapping) {
    this.keyDownMappings = mappings;
  }
  resetMappings() {
    this.keyUpMappings = {};
    this.keyDownMappings = {};
  }
}
