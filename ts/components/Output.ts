import m from "mithril";
import { Actions, State } from "../services/state.ts";

export const Output = {
  view() {
    const headers = State.objects.length > 0 ? Object.keys(State.objects[0]) : [];
    const rows = State.objects.map((obj: any) =>
      headers.map((header) => obj[header] ?? "")
    );

    if (State.objects.length > 0) {
      return m("div.output", [
        m("h3", `Output ${State.objects.length} rows`),
        m("table", [
          m("tr", headers.map((header) => m("th", header))),
          ...rows.map((row) =>
            m("tr", row.map((cell) => m("td", cell)))
          ),
        ]),
      ]);
    }
  },
};
