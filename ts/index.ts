import m from "mithril";

import { header } from "./components/header.ts";
import { attachCodeMirror, editor } from "./components/editor.ts";
import { output } from "./components/output.ts";
import { listen } from "./commons/events.ts";
import {
  onCodeEdit,
  onFileChange,
  onOutputFormatChanged,
  onTripleStoreUpdated,
  onTriplesUpdated,
  onValidCodeAdded,
} from "./actions.ts";
import { AppEvents } from "./constants.ts";
import { settings } from "./components/settings.ts";

const App = {
  view() {
    return m("div.grid", [
      m(header),
      m(settings),
      m(editor),
      m(output),
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
listen(AppEvents.OUTPUT_FORMAT_CHANGED, onOutputFormatChanged);
