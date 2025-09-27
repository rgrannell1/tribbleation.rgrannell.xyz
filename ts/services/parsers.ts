import { TribbleDB, TribbleParser } from "tribbledb";
import {
  CodeState,
  TriplesState,
} from "../types.ts";

/*
 * Check that the code parses as JavaScript.
 *
 * @param code The code to parse.
 * @return The result of the parse.
 */
export function parseCode(code: string): CodeState {
  try {
    new Function(code);
  } catch (err) {
    return {
      state: "failed",
      text: code,
      error: (err as Error).message,
    };
  }

  return {
    state: "ok",
    text: code,
  };
}

export function parseTribbles(content: string): TriplesState {
  if (!content) {
    return {
      state: "failed",
      format: "tribbles",
      error: "Empty tribbles file",
    };
  }

  const rows = [];
  try {
    const parser = new TribbleParser();

    for (const line of content.split("\n")) {
      if (!line) {
        continue;
      }

      const triple = parser.parse(line);
      if (triple) {
        rows.push(triple);
      }
    }
  } catch (err) {
    return {
      state: "failed",
      format: "tribbles",
      error: (err as Error).message,
    };
  }

  return {
    state: "ok",
    format: "tribbles",
    data: new TribbleDB(rows),
  };
}

export function parseTriples(triples: string): TriplesState {
  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(triples);
  } catch (_err) {
    return {
      state: "failed",
      format: "triples",
      error: "Could not parse triples file as JSON",
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      state: "failed",
      format: "triples",
      error: "Triples file must be an array",
    };
  }

  let size = undefined;
  for (const elem of parsed) {
    if (!Array.isArray(elem)) {
      return {
        state: "failed",
        format: "triples",
        error: "All entries in a triple-file must be an array",
      };
    }

    if (typeof size === "undefined") {
      size = elem.length;
    }

    if (elem.length !== size) {
      return {
        state: "failed",
        format: "triples",
        error: "All rows in the triple file should have the same length",
      };
    }
  }

  return {
    state: "ok",
    format: "triples",
    data: new TribbleDB(parsed),
  };
}
