//how to distribute nav throughout application
// very similiar to how context works
//nav dispatches an action object that creates a new state change that

let navigator;
import { NavigationActions } from "react-navigation";

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    )
  );
};
