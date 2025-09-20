import m from "mithril";
import { Actions, State } from "../services/state.ts";

export const Editor = {
  view() {
    return m("div.editor-container", [
      m("p#error", State.codeFailure),
      m("textarea.editor", {
        value: State.code,
        spellcheck: false,
        onkeyup: Actions.updateCode,
      }),
    ]);
  },
};
