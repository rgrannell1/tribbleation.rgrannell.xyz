import m from "mithril";

import { Storage } from "./storage.ts";
import { state } from "../config.ts";
import { parseCode } from "./parsers.ts";
import { broadcast } from "./events.ts";

/*
 * Handle code-edits
 */
export function onCodeEdit(event: Event) {
  const detail = (event as CustomEvent).detail satisfies { code: string };

  Storage.setCode(detail.code);
  state.code = parseCode(detail.code);
  m.redraw();

  if (state.code.state === "ok") {
    broadcast("valid_code_added", {});
  }
}

/*
 * Handle new parsable code being added
 */
export function onValidCodeAdded(event: Event) {
}

/*
 * Handle triple / tribble files being added
 */
export function onFileChange(event: Event) {
}
