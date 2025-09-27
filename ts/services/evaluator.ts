export function evaluateCode(tdb: any, code: string) {
  try {
    return {
      state: "ok",
      tdb: new Function("$tdb", code)(tdb),
    };
  } catch (err) {
    return {
      state: "failed",
      error: (err as Error).message,
    };
  }
}
