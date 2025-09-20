#!/bin/bash

npx esbuild ts/index.ts     \
  --bundle                  \
  --outfile=dist/js/app.js  \
  --format=esm              \
  --minify                  \
  --sourcemap
