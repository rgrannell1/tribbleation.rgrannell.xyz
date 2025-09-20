import m from "mithril";
import { DEFAULT_CODE } from "../constants.ts";
import { Storage } from "./storage.ts";
import { TribbleParser, TribbleDB } from "../../library/tribble.js";

export type StateType = {
  code: string;
  codeFailure: string;
  results: any[][]
}

export const State: StateType = {
  code: Storage.getCode() ?? DEFAULT_CODE,
  codeFailure: "",
  results: parseTribbles(Storage.getTribbles() ?? '') ?? [],
  objects: []
};

function parseCode(code: string): Error | null {
  try {
    new Function(code);
    return null;
  } catch (err) {
    return err as Error;
  }
}

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

  const output = getCodeOutput(State.results);
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

function getCodeOutput(rows: any[][]) {
  const result = runCode(rows);

  if (!result || !result.objects) {
    State.codeFailure = "Code did not return a TribbleDB object";
    State.objects = [];
    return
  }

  return result.objects();
}

function parseTribbles(content: string) {
  if (!content) {
    return;
  }

  const parser = new TribbleParser();
  const rows = [];

  for (const line of content.split("\n")) {
    if (!line) {
      continue
    }

    const triple = parser.parse(line);
    if (triple) {
      rows.push(triple);
    }
  }

  return rows
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
  if (typeof rows !== 'undefined') {
    State.results = rows;
  }

  const output = getCodeOutput(State.results);
  State.objects = output ?? [];
  m.redraw();
}

export const Actions = {
  updateCode(event: Event) {
    return updateCode(event);
  },
  async onFileChange(event: Event) {
    return await onFileChange(event);
  },
};
