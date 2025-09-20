// actions.js
import { state } from "./state.js";

function parseTriples(text) {
  const triples = [];
  const lines = text.split(/\r?\n/);
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    let parts = line.split(/[\t, ]+/);
    if (parts.length !== 3) {
      throw new Error("Line does not have 3 columns: " + line);
    }
    triples.push(parts);
  }
  return triples;
}

export const actions = {
  setCode: (code) => state.code = code,
  clearFile: () => {
    state.triples = null;
    state.filename = null;
    state.error = "";
    state.output = "";
    localStorage.removeItem("tribble_content");
  },
  handleFile: (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseTriples(e.target.result);
        state.triples = parsed;
        state.filename = file.name;
        localStorage.setItem(
          "tribble_content",
          JSON.stringify({ triples: parsed, filename: file.name }),
        );
        state.error = "";
        m.redraw();
      } catch (err) {
        state.error = "Parse error: " + err.message;
        state.triples = null;
        state.filename = null;
        m.redraw();
      }
    };
    reader.readAsText(file);
  },
  runCode: async () => {
    state.output = "";
    state.error = "";
    try {
      const mod = await import("./lib/tribbledb.mod.js");
      const TribbleDB = mod.TribbleDB || mod.default;
      // eslint-disable-next-line no-new-func
      const userFunc = new Function(
        "TribbleDB",
        "$content",
        state.code + "\nreturn createDB();",
      );
      const db = userFunc(TribbleDB, state.triples);
      if (!db || typeof db.objects !== "function") {
        state.output =
          '<span style="color:red">Returned value is not a TribbleDB instance.</span>';
        m.redraw();
        return;
      }
      const objects = db.objects();
      if (!Array.isArray(objects) || objects.length === 0) {
        state.output = "<span>No data returned.</span>";
        m.redraw();
        return;
      }
      const keys = Object.keys(objects[0]);
      let html = "<table><thead><tr>" + keys.map((k) =>
        `<th>${k}</th>`
      ).join("") + "</tr></thead><tbody>";
      for (const row of objects) {
        html += "<tr>" + keys.map((k) => `<td>${row[k] ?? ""}</td>`).join("") +
          "</tr>";
      }
      html += "</tbody></table>";
      state.output = html;
      m.redraw();
    } catch (err) {
      state.error = err.message || String(err);
      m.redraw();
    }
  },
};
