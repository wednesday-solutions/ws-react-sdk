#!/bin/bash
rm -rf lib

node rollup/roller.js  --environment ENV_NAME:production,BUILD:production
