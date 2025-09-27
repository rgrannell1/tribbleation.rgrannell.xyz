import m from "mithril";
import { state } from "../config.ts";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { broadcast } from "../commons/events.ts";
import { AppEvents, QUERY_DOCUMENTATION } from "../constants.ts";

export const errorDetails = {
  view() {
    if (state.code.state === "ok") {
      return m("div#error-details", "no errors!");
    }

    return m("div#error-details.error", state.code.error);
  },
};

export const editor = {
  view() {
    return m("div.editor-container", [
      m("h2", "Query Editor"),
      m("p", QUERY_DOCUMENTATION),
      m(errorDetails),
      m("div.editor", {}),
    ]);
  },
};

/*
 * I have no idea how to bind this component through Mithril, so
 * attatch it through direct DOM manipulation for the moment
 */
export function attachCodeMirror() {
  const $editor = document.querySelector("div.editor");
  if (!$editor) {
    throw new Error("div editor element not present");
  }

  new EditorView({
    doc: state.code.text,
    parent: $editor,
    extensions: [basicSetup, javascript()],
  });

  $editor.addEventListener("keyup", (event: Event) => {
    if (event.target) {
      broadcast(AppEvents.CODE_UPDATED, {
        code: (event.target as HTMLElement).innerText,
      });
    }
  });
}
