import * as _ from "lodash";
import { Figure } from "./Base";
import { FigureType1 } from "./Variants/Type1";
import { FigureType2 } from "./Variants/Type2";
import { FigureType3 } from "./Variants/Type3";
import { FigureType4 } from "./Variants/Type4";
import { FigureType5 } from "./Variants/Type5";
import { FigureType6 } from "./Variants/Type6";
import { FigureType7 } from "./Variants/Type7";
import { FigureEnum } from "./Variants/types";
import { GridState } from "../../state/Grid";

export const FigureFactory = {
  createRandomFigure(gridState: GridState): Figure {
    const type = _.sample(
      // @ts-ignore
      Object.values(FigureEnum).filter((t) => _.isInteger(t))
    ) as FigureEnum;
    const color = _.sample([
      "yellow",
      "green",
      "cyan",
      "blue",
      "red",
      "orange",
    ]);
    switch (type) {
      case +FigureEnum.Type_1:
        return new FigureType1(color, gridState);
      case +FigureEnum.Type_2:
        return new FigureType2(color, gridState);
      case +FigureEnum.Type_3:
        return new FigureType3(color, gridState);
      case +FigureEnum.Type_4:
        return new FigureType4(color, gridState);
      case +FigureEnum.Type_5:
        return new FigureType5(color, gridState);
      case +FigureEnum.Type_6:
        return new FigureType6(color, gridState);
      case +FigureEnum.Type_7:
        return new FigureType7(color, gridState);
      default:
        throw new Error("unknown figure type");
    }
  },
};
