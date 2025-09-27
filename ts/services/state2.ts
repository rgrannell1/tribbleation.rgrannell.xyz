
import { InputData, State } from "../types.ts";
import { Storage } from "./storage.ts";
import { parseCode } from './parsers.ts';

/*
 * Initialise application-state from storage
 *
 */
export function loadState(): State {
  const inputFormat = Storage.getInputFormat()
  const inputData = Storage.getData()

  const input = inputFormat && inputData
    ? { text: inputData, format: inputFormat }
    : undefined

  const code = parseCode(Storage.getCode() ?? '')
  const settings = {
    outputFormat: Storage.getOutputFormat() ?? 'rows'
  }

  return {
    code,
    settings,
    input
  }
}
