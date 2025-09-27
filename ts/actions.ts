/*
 * React to user-input, and update state
 */

import m from "mithril";

import { Storage } from "./services/storage.ts";
import { state } from "./config.ts";
import { parseCode, parseTribbles, parseTriples } from "./services/parsers.ts";
import { broadcast } from "./commons/events.ts";
import { readFile } from "./commons/files.ts";
import { AppEvents, DEFAULT_OUTPUT_FORMAT } from "./constants.ts";
import { evaluateCode } from "./services/evaluator.ts";

/*
 * ~~~~ Event Handlers ~~~~~
 */

/*
 * Handle code-edits
 */
export function onCodeEdit(event: Event) {
  const detail = (event as CustomEvent).detail satisfies { code: string };

  Storage.setCode(detail.code);
  state.code = parseCode(detail.code);
  m.redraw();

  if (state.code.state === "ok") {
    broadcast(AppEvents.VALID_CODE_ADDED, {});
  }
}

/*
 * Handle new parsable code being added
 */
export function onValidCodeAdded() {
  if (state.triples?.state !== "ok" || state.code.state !== "ok") {
    return;
  }

  const evalResult = evaluateCode(state.triples.data, state.code.text);
  if (evalResult.state === "failed") {
    state.code = {
      state: "failed",
      text: state.code.text,
      error: evalResult.error,
    };

    m.redraw();
    return;
  }

  broadcast(AppEvents.TRIPLESTORE_UPDATED, { tdb: evalResult.tdb });
}

/*
 * Handle triple / tribble files being added
 */
export async function onFileChange(event: Event) {
  const detail = (event as CustomEvent).detail satisfies { files: File[] };

  Storage.setInputFormat("tribbles");

  if (detail.files.length !== 1) {
    state.input = {
      state: "failed",
      format: Storage.getInputFormat() as any,
      error: "Please select a single file",
    };
  }

  const [file] = detail.files;

  const content = await readFile(file);
  Storage.setData(content);

  if (state.settings.inputFormat === "tribbles") {
    state.triples = parseTribbles(content);
  } else if (state.settings.inputFormat === "triples") {
    state.triples = parseTriples(content);
  } else {
    throw new Error("Unknown input format");
  }

  broadcast(AppEvents.TRIPLES_UPDATED, {});
}

/*
 * Run when triples are reloaded
 */
export async function onTriplesUpdated(event: Event) {
  onValidCodeAdded();
}

/*
 * The triplestore is updated, so update results.
 */
export function onTripleStoreUpdated(event: Event) {
  const { tdb } = (event as CustomEvent).detail satisfies { tdb: any };

  const outputFormat = Storage.getOutputFormat() ?? DEFAULT_OUTPUT_FORMAT;
  if (outputFormat === "rows") {
    state.results = {
      format: "rows",
      data: tdb.triples(),
    };
  } else if (outputFormat === "objects") {
    state.results = {
      format: "objects",
      data: tdb.objects(),
    };
  }

  m.redraw();
}

export function onOutputFormatChanged(event: Event) {
  const { format } = (event as CustomEvent).detail satisfies { format: string };
  Storage.setOutputFormat(format);

  onValidCodeAdded();
}
