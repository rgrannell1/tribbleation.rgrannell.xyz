import m from "mithril";
import { broadcast } from "../services/events";
import { AppEvents } from "../constants";

const onchange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  broadcast(AppEvents.OUTPUT_FORMAT_CHANGED, { format: value });
};

export const Settings = {
  view() {
    return m("div.settings", [
      m("label", [
        "Output format: ",
        m("select", { name: "output-format", onchange }, [
          m("option", { value: "rows" }, "rows"),
          m("option", { value: "objects" }, "objects"),
        ]),
      ]),
    ]);
  },
};
