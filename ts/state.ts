import { InputState, State } from "./types.ts";
import { Storage } from "./services/storage.ts";
import { parseCode } from "./services/parsers.ts";
import { DEFAULT_CODE } from "./constants.ts";

/*
 * Initialise application-state from storage
 */
export function loadState(): State {
  const inputFormat = Storage.getInputFormat();
  const inputData = Storage.getData();

  const input: InputState | undefined = inputFormat && inputData
    ? { state: 'ok', data: inputData, format: inputFormat }
    : undefined;

  const code = parseCode(Storage.getCode() ?? DEFAULT_CODE);
  const settings = {
    outputFormat: Storage.getOutputFormat() ?? "rows",
    inputFormat: inputFormat ?? "tribbles",
  };

  return {
    code,
    settings,
    input
  };
}
