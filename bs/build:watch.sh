#!/bin/bash

find index.html css library ts | entr -r ./bs/build.sh
