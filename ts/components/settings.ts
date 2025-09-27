import m from "mithril";
import { broadcast } from "../commons/events";
import { AppEvents } from "../constants";
import { OutputFormat } from "../types";

const onchange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  broadcast(AppEvents.OUTPUT_FORMAT_CHANGED, { format: value });
};

const outputOption = (value: OutputFormat) => {
  return m("option", { value }, value);
}

export const settings = {
  view() {
    return m("div.settings", [
      m("label", [
        "Output format: ",
        m("select", { name: "output-format", onchange }, [
          outputOption("rows"),
          outputOption("objects")
        ]),
      ]),
    ]);
  },
};
