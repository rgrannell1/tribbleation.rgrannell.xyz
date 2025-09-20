import m from "mithril";

import { Header } from "./components/Header.ts";
import { Editor } from "./components/Editor.ts";
import { Output } from "./components/Output.ts";

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
