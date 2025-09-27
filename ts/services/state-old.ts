import m from "mithril";
import { Storage } from "./storage.ts";

function getCodeOutput(rows: any[][], format: string) {
  const result = runCode(rows);

  if (!result || !result.objects) {
    State.codeFailure = "Code did not return a TribbleDB object";
    State.objects = [];
    return;
  }

  if (format === "objects") {
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
