import m from "mithril";

import { Header } from "./components/Header.ts";
import { attachCodeMirror, Editor } from "./components/Editor.ts";
import { Output } from "./components/Output.ts";
import { listen, onCodeEdit } from "./services/events.ts";

const App = {
  view() {
    return m("div.grid", [
      m(Header),
      m(Editor),
      m(Output),
    ]);
  },
};

m.mount(document.body, App);

attachCodeMirror();

/* ~~~~~ State Handling ~~~~~ */

listen("code_updated", onCodeEdit);
