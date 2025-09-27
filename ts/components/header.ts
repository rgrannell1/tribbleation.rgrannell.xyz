import m from "mithril";

import { logo } from "./logo.ts";
import { workspace } from "./workspace.ts";

export const header = {
  view() {
    return m("header", [
      m(logo),
      m(workspace),
    ]);
  },
};
