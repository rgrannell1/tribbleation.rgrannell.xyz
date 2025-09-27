import m from "mithril";
import { DEFAULT_CODE } from "../constants.ts";
import { Storage } from "./storage.ts";
import { TribbleDB, TribbleParser } from "../../library/tribble.js";
import { InputParseResult, StateType } from "../types.ts";



function updateCode(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  State.code = target.value;
  Storage.setCode(State.code);

  const err = parseCode(State.code);
  if (err) {
    console.error("failed to parse code");
    State.codeFailure = `Failed to parse code: ${err.message}`;
  } else {
    State.codeFailure = "";
  }

  const output = getCodeOutput(State.results, State.outputFormat);
  State.objects = output ?? [];

  m.redraw();
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      resolve(content);
    };
    reader.readAsText(file);
  });
}

function runCode(rows: any[][]) {
  try {
    // eslint-disable-next-line no-new-func
    return new Function("$content", "TribbleDB", State.code)(rows, TribbleDB);
  } catch (err) {
    console.error("failed to execute code", err);
    State.codeFailure = `Failed to execute code: ${(err as Error).message}`;
    return undefined;
  }
}

function getCodeOutput(rows: any[][], format: string) {
  const result = runCode(rows);

  if (!result || !result.objects) {
    State.codeFailure = "Code did not return a TribbleDB object";
    State.objects = [];
    return;
  }

  if (format === 'objects') {
    return result.objects();
  } else {
    return result.objects();
  }
}


async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  const [file] = input.files;
  const content = await readFile(file);
  Storage.setTribbles(content);

  const rows = parseTribbles(content);
  if (typeof rows !== "undefined") {
    State.results = rows;
  }

  const output = getCodeOutput(State.results, State.outputFormat);
  State.objects = output ?? [];
  m.redraw();
}

// todo change to a broadcast listen patternt
export const Actions = {
  updateCode(event: Event) {
    return updateCode(event);
  },
  async onFileChange(event: Event) {
    return await onFileChange(event);
  },
};
