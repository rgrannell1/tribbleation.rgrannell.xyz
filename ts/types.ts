
import { TribbleDB } from "tribbledb";

export type InputFormat = "tribbles" | "triples";
export type OutputFormat = "rows" | "objects";

/* ~~~~~~~~~~~~~~ */

export type ApplicationEvents =
  | "code_updated"
  | "valid_code_added"
  | "file_changed"
  | "triples_updated"
  | "triplestore_updated"
  | "output_format_changed";

/* ~~~~~~~~~~~~~~ */

export type InputData = {
  format: InputFormat;
  text: string;
};

export type InputState = OkInputState | FailedInputState;

export type OkInputState = {
  state: "ok";
  format: string;
  data: string;
};

export type FailedInputState = {
  state: "failed";
  format: string;
  error: string;
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
    inputFormat: InputFormat;
    outputFormat: OutputFormat;
  };
  input?: InputState;
  triples?: TriplesState;
  results?: Results;
};

/* ~~~~~~ Code Evaluation ~~~~~~~~ */

export type EvaluateState = OkEvaluateState | FailedEvaluateState;

export type OkEvaluateState = {
  state: "ok";
  tdb: TribbleDB;
};

export type FailedEvaluateState = {
  state: "failed";
  error: string;
};

/* ~~~~~~~~~~~~~~ */

export type TriplesState = OkTriplesState | FailedTriplesState;

export type OkTriplesState = {
  state: "ok";
  format: InputFormat;
  data: TribbleDB;
};

export type FailedTriplesState = {
  state: "failed";
  format: InputFormat;
  error: string;
};
