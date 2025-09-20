import { Actions } from "./services/state.ts";

export type State = {
  code: string;
};

export type AppActions = ReturnType<typeof Actions>;
