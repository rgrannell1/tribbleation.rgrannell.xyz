import m from "mithril";

export const Workspace = {
  view() {
    return m("div.workspace", [
      m("input.workspace[type=file]", {
        onchange: () => {},
      }),
    ]);
  },
};
