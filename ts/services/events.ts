/*
 * Handle state-updates in response to events by delegating to other services. Handles
 * state-updates and rerenders.
 */

import m from "mithril";
import { ApplicationEvents } from "../types.ts";
import { Storage } from "./storage.ts";
import { state } from "./config.ts";
import { parseCode } from "./parsers.ts";

/*
 * Broadcast a custom application event to the document.
 */
export function broadcast(
  label: ApplicationEvents,
  detail: CustomEvent["detail"],
) {
  document.dispatchEvent(
    new CustomEvent(label, {
      detail,
    }),
  );
}

export function listen(
  label: ApplicationEvents,
  callback: (event: Event) => void,
) {
  document.addEventListener(label, callback);
}

/*
 * Handle code-edits
 *
 */
export function onCodeEdit(event: Event) {
  const detail = (event as CustomEvent).detail satisfies { code: string };

  Storage.setCode(detail.code);
  state.code = parseCode(detail.code);
  m.redraw();

}

export function onFileChange(event: Event) {
}
