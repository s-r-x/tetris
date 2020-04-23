import { Loader } from "pixi.js";
// @ts-ignore
import bricks from "./assets/bricks/*.png";
// @ts-ignore
import bg from "./assets/bg.png";
// @ts-ignore
import button from './assets/button.png';
// @ts-ignore
import buttonActive from './assets/button_active.png';
// @ts-ignore
import bgPattern from './assets/bg_pattern.jpg'

import * as webfont from "webfontloader";

const loadPixiAssets = () =>
  new Promise((r) => {
    const loader = Loader.shared;
    Object.keys(bricks).map((name) => {
      const path = bricks[name];
      loader.add(name, path);
    });
    loader.add("bg", bg);
    loader.add("button", button);
    loader.add("button_active", buttonActive);
    loader.add("bg_pattern", bgPattern)
    loader.load(r);
  });
const loadFonts = () =>
  new Promise((r) => {
    webfont.load({
      custom: {
        families: ["Pribambas"],
      },
      active: r,
    });
  });
export const loadAssets = () => Promise.all([loadPixiAssets(), loadFonts()]);
