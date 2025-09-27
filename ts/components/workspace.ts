import m from "mithril";

import { broadcast } from "../commons/events.ts";
import { AppEvents } from "../constants.ts";

const onchange = (event: Event) => {
  const input = event.target as HTMLInputElement;

  broadcast(AppEvents.FILE_CHANGED, { files: input.files });
}

export const workspace = {
  view() {
    return m("div.workspace", [
      m("input.workspace[type=file]", { onchange }),
    ]);
  },
};
