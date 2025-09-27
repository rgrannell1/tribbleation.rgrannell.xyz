import { TribbleParser } from "../../library/tribble.js";
import { CodeState, InputParseResult } from "../types.ts";

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

export function parseTribbles(content: string): InputParseResult {
  if (!content) {
    return {
      state: "failed",
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
      error: (err as Error).message,
    };
  }

  return {
    state: "ok",
    data: rows,
  };
}

export function parseTriples(triples: string): InputParseResult {
  try {
    var parsed = JSON.parse(triples);
  } catch (err) {
    return {
      state: "failed",
      error: "Could not parse triples file as JSON",
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      state: "failed",
      error: "Triples file must be an array",
    };
  }

  let size = undefined;
  for (const elem of parsed) {
    if (!Array.isArray(elem)) {
      return {
        state: "failed",
        error: "All entries in a triple-file must be an array",
      };
    }

    if (typeof size === "undefined") {
      size = elem.length;
    }

    if (elem.length !== size) {
      return {
        state: "failed",
        error: "All rows in the triple file should have the same length",
      };
    }
  }

  return {
    state: "ok",
    data: parsed,
  };
}
