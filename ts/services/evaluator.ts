import { TribbleDB } from "../../library/tribble.js";
import { EvaluateState } from "../types.js";

/*
 * Evaluate against user-provided inputs.
 */

/*
 * Evaluate user-provided code in the context of the loaded triples
 */
export function evaluateCode(tdb: any, code: string): EvaluateState {
  try {
    const res = new Function("$tdb", code)(tdb);

    if (!(res instanceof TribbleDB)) {
      return {
        state: "failed",
        error: "Code did not return a TribbleDB object",
      };
    }

    return {
      state: "ok",
      tdb: res,
    };
  } catch (err) {
    return {
      state: "failed",
      error: (err as Error).message,
    };
  }
}
