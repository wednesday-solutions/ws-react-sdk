#!/bin/bash
rm -rf lib

ENV_NAME=production node rollup/roller.js
