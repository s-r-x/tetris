import { Container } from "inversify";
import { TYPES } from "./types";
import { RENDERER_CONFIG } from "../constants";

import { Keyboard } from "../controls/Keyboard";
import { GameControls } from "../controls";

import { GridState } from "../state/Grid";
import { ScoreState } from "../state/Score";
import { GameState } from "../state/Game";
import { FiguresState } from "../state/Figures";

import { Renderer, Stage } from "../Renderer";
import { App } from "../app";

import { GridUI } from "../UI/Grid";
import { ScoreUI } from "../UI/Score";
import { BgUI } from "../UI/Bg";
import { QueueUI } from "../UI/Queue";
import { LevelUI } from "../UI/Level";
import { LinesUI } from "../UI/Lines";
import { UI } from "../UI";
import { HomeMenu } from "../UI/HomeMenu";

const container = new Container();
container.bind(TYPES.Renderer).toConstantValue(new Renderer(RENDERER_CONFIG));

container.bind(TYPES.BgUI).to(BgUI);
container.bind(TYPES.GridUI).to(GridUI);
container.bind(TYPES.ScoreUI).to(ScoreUI);
container.bind(TYPES.QueueUI).to(QueueUI);
container.bind(TYPES.LevelUI).to(LevelUI);
container.bind(TYPES.LinesUI).to(LinesUI);
container.bind(TYPES.HomeMenu).to(HomeMenu);
container.bind(TYPES.UI).to(UI).inSingletonScope();

container.bind(TYPES.Stage).toConstantValue(new Stage());
container.bind(TYPES.Keyboard).to(Keyboard);
container.bind(TYPES.GameControls).to(GameControls).inSingletonScope();
container.bind(TYPES.ScoreState).to(ScoreState).inSingletonScope();
container.bind(TYPES.GridState).to(GridState).inSingletonScope();
container.bind(TYPES.FiguresState).to(FiguresState).inSingletonScope();
container.bind(TYPES.GameState).to(GameState).inSingletonScope();
container.bind(TYPES.App).to(App).inSingletonScope();

export { container };
