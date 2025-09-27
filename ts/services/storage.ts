/*
 * Persist and load values across sessions.
 */

import {
  CODE_KEY,
  DATA_KEY,
  INPUT_FORMAT_KEY,
  OUTPUT_FORMAT_KEY,
} from "../constants.ts";
import { InputFormat, OutputFormat } from "../types.ts";

export class Storage {
  static getCode(): string | null {
    return localStorage.getItem(CODE_KEY);
  }

  static setCode(code: string): void {
    localStorage.setItem(CODE_KEY, code);
  }

  static getData(): string | null {
    return localStorage.getItem(DATA_KEY);
  }

  static getInputFormat(): InputFormat | null {
    return localStorage.getItem(INPUT_FORMAT_KEY) as InputFormat | null;
  }

  static setInputFormat(inputFormat: InputFormat): void {
    localStorage.setItem(INPUT_FORMAT_KEY, inputFormat);
  }

  static setTribbles(tribbles: string) {
    localStorage.setItem(DATA_KEY, tribbles);
  }

  static getOutputFormat(): OutputFormat | null {
    return localStorage.getItem(OUTPUT_FORMAT_KEY) as OutputFormat | null;
  }

  static setOutputFormat(outputFormat: OutputFormat): void {
    localStorage.setItem(OUTPUT_FORMAT_KEY, outputFormat);
  }
}
