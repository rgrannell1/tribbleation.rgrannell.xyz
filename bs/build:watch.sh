#!/bin/bash

find index.html css ts | entr -r ./bs/build.sh
