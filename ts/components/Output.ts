import m from "mithril";
import { state } from "../config.ts";
import { ObjectResults, TriplesResults } from "../types.ts";

function ObjectsOutput(results: ObjectResults) {
  const data = results.data;
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const rows = data.map((obj: any) =>
    headers.map((header) => obj[header] ?? "")
  );

  if (data.length > 0) {
    return m("div.output", [
      m("h3", `Output ${data.length} rows`),
      m("table", [
        m("tr", headers.map((header) => m("th", header))),
        ...rows.map((row) => m("tr", row.map((cell) => m("td", cell)))),
      ]),
    ]);
  }
}

function RowsOutput(results: TriplesResults) {
  const data = results.data;

  return m("div.output", [
    m("h3", `Output ${data.length} rows`),
    m("table", [
      data.map((row) => m("tr", row.map((cell: any) => m("td", cell)))),
    ]),
  ]);
}

export const Output = {
  view() {
    if (!state.results) {
      return m("div.output", [
        m("h3", "Output"),
        m("p", "No results to display"),
      ]);
    }

    if (state.results.format === "rows") {
      return RowsOutput(state.results satisfies TriplesResults);
    } else if (state.results.format === "objects") {
      return ObjectsOutput(state.results satisfies ObjectResults);
    } else {
      return m("p", "unsupported output format");
    }
  },
};
