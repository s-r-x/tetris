import { Container, Renderer as PixiRenderer } from "pixi.js";
import { injectable } from "inversify";

@injectable()
export class Renderer extends PixiRenderer {}

@injectable()
export class Stage extends Container {}
