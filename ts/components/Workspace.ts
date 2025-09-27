import m from "mithril";

import { broadcast } from "../services/events.ts";
import { AppEvents } from "../constants";

export const Workspace = {
  view() {
    return m("div.workspace", [
      m("input.workspace[type=file]", {
        onchange(event: Event) {
          broadcast(AppEvents.FILE_CHANGED, { target: event.target });
        },
      }),
    ]);
  },
};
