/*
 * Application-wide variables
 *
 * For the moment, just `state` definitions
 */

import { loadState } from "./services/state.ts";

export const state = loadState();
