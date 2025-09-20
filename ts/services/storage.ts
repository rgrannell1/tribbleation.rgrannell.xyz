/*
 * Persist and load values across sessions.
 */

export class Storage {
  static getCode(): string | null {
    return localStorage.getItem("tribbleations.code");
  }

  static setCode(code: string): void {
    localStorage.setItem("tribbleations.code", code);
  }

  static getTribbles(): string | null {
    return localStorage.getItem("tribbleations.tribbles");
  }

  static setTribbles(tribbles: string) {
    localStorage.setItem("tribbleations.tribbles", tribbles);
  }
}
