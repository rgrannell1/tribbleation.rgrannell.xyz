import m from "mithril";
import { state } from "../services/state.ts";

function ObjectsOutput() {
  const headers = State.objects.length > 0 ? Object.keys(State.objects[0]) : [];
  const rows = State.objects.map((obj: any) =>
    headers.map((header) => obj[header] ?? "")
  );

  if (State.objects.length > 0) {
    return m("div.output", [
      m("h3", `Output ${State.objects.length} rows`),
      m("table", [
        m("tr", headers.map((header) => m("th", header))),
        ...rows.map((row) => m("tr", row.map((cell) => m("td", cell)))),
      ]),
    ]);
  }
}

function RowsOutput() {
  return m("div.output", [
    m("h3", `Output ${State.results.length} rows`),
    m("table", [
      ...State.results.map((row) => m("tr", row.map((cell) => m("td", cell)))),
    ]),
  ]);
}

export const Output = {
  view() {

    return m("div.output", [
      m("h2", `Output`)
    ]);

    if (State.outputFormat === "rows") {
      return RowsOutput();
    } else if (State.outputFormat === "objects") {
      return ObjectsOutput();
    } else {
      return m("p", "unsupported output format");
    }
  },
};
