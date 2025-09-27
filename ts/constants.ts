import { ApplicationEvents } from "./types";

export const DEFAULT_CODE = `
return $tdb.search({
  relation: 'name'
});
`;

export const QUERY_DOCUMENTATION = `
Write TribbleDB queries.
`;

export const CODE_KEY = "tribbleations.code";
export const DATA_KEY = "tribbleations.data";
export const INPUT_FORMAT_KEY = "tribbleations.input_format";
export const OUTPUT_FORMAT_KEY = "tribbleations.output_format";

export class AppEvents {
  static CODE_UPDATED: ApplicationEvents = "code_updated";
  static VALID_CODE_ADDED: ApplicationEvents = "valid_code_added";
  static FILE_CHANGED: ApplicationEvents = "file_changed";
  static TRIPLES_UPDATED: ApplicationEvents = "triples_updated";
  static TRIPLESTORE_UPDATED: ApplicationEvents = "triplestore_updated";
  static OUTPUT_FORMAT_CHANGED: ApplicationEvents = "output_format_changed";
}

export const DEFAULT_OUTPUT_FORMAT = "rows";
