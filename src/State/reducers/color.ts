import { ColorActions } from "../actions/color";
import { Reducer, AnyAction } from "redux";
import { run } from "../../tools/composer";

export type ColorState = {
  color: string;
  tempColor: string;
};

const INITIAL_STATE = {
  color: "black",
  tempColor: ""
};

export const colorReducer: Reducer<ColorState> = (
  state: ColorState = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case ColorActions.changeColor:
      run("TestName", [
        {
          action: "jira_login",
          params: {
            user: "jairo.viciana",
            pass: "3corazoness.",
            url: "jira.rochedevops.accentureanalytics.com"
          }
        }
      ]);
      return {
        ...state,
        color: action.payload
      };
    case ColorActions.changeTempColor:
      return {
        ...state,
        tempColor: action.payload
      };
    default:
      return state;
  }
};
