import m from "mithril";

import { Logo } from "./Logo.ts";
import { Workspace } from "./Workspace.ts";

export const Header = {
  view() {
    return m("header", [
      m(Logo),
      m(Workspace),
    ]);
  },
};
