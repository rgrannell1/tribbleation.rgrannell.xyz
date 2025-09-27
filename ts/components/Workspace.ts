import m from "mithril";

import { broadcast } from "../services/events.ts";
import { AppEvents } from "../constants";

export const Workspace = {
  view() {
    return m("div.workspace", [
      m("input.workspace[type=file]", {
        onchange(event: Event) {
          const input = event.target as HTMLInputElement;

          broadcast(AppEvents.FILE_CHANGED, { files: input.files });
        },
      }),
    ]);
  },
};
