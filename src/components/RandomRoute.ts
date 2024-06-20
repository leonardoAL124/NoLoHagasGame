import { RouteName } from "../interfaces/routeName";
import { acum } from "./PointsCount";

export const routeSelector = (randomRoutes: RouteName[]) => {
  let length: number = randomRoutes.length;
  let routeName: string = "";
  
  if (acum == 10) {
    routeName = "Win";
  } else {
    const randomNumber = Math.floor(Math.random() * length);

    for (let i = 0; i < length; i++) {
      if (randomNumber === i) {
        routeName = randomRoutes[i].name;
      }
    }
  }

  return routeName;
};
