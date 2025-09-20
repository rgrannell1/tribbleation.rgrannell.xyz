import m from "mithril";
import { Actions } from "../services/state.ts";

export const Workspace = {
  view() {
    return m("div.workspace", [
      m("input.workspace[type=file]", {
        onchange: Actions.onFileChange,
      }),
    ]);
  },
};
