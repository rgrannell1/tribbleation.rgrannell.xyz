import m from "mithril";

import { Header } from "./components/Header.ts";
import { attachCodeMirror, Editor } from "./components/Editor.ts";
import { Output } from "./components/Output.ts";
import { listen } from "./services/events.ts";
import {
  onCodeEdit,
  onFileChange,
  onTripleStoreUpdated,
  onTriplesUpdated,
  onValidCodeAdded,
} from "./actions.ts";
import { AppEvents } from "./constants.ts";

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

listen(AppEvents.CODE_UPDATED, onCodeEdit);
listen(AppEvents.VALID_CODE_ADDED, onValidCodeAdded);
listen(AppEvents.FILE_CHANGED, onFileChange);
listen(AppEvents.TRIPLES_UPDATED, onTriplesUpdated);
listen(AppEvents.TRIPLESTORE_UPDATED, onTripleStoreUpdated);
