import "reflect-metadata";
import gsap from "gsap";
import PIXIPlugin from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";
import { container } from "./containers";
import { TYPES } from "./containers/types";
import { App } from "./app";
PIXIPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PIXIPlugin);

const game = container.get<App>(TYPES.App);
game.load();
