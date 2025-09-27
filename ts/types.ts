export type OutputFormat = "rows" | "objects";

export type InputFormat = "tribbles" | "triples";

export type InputData = {
  format: InputFormat;
  text: string;
};

export type ObjectResults = {
  format: "objects";
  data: Record<string, any>[];
};

export type TriplesResults = {
  format: "rows";
  data: any[];
};

export type Results =
  | ObjectResults
  | TriplesResults;

export type CodeState =
  | OkCodeState
  | FailedCodeState;

export type OkCodeState = {
  state: "ok";
  text: string;
};

export type FailedCodeState = {
  state: "failed";
  text: string;
  error: string;
};

export type State = {
  code: CodeState;
  settings: {
    outputFormat: OutputFormat;
  };
  input?: InputData;
  results?: Results;
};

/* ~~~~~~~~~~~~~~ */

export type ApplicationEvents =
  | "code_updated"
  | "valid_code_added"
  | "file_changed";

/* ~~~~~~~~~~~~~~ */

export type OkParseResult = {
  state: "ok";
  data: any[];
};

export type FailedParseResult = {
  state: "failed";
  error: string;
};

export type InputParseResult =
  | OkParseResult
  | FailedParseResult;
