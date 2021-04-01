#!/bin/bash
rm -rf lib
yarn rollup:dev:services | yarn rollup:dev:themes | yarn rollup:dev:components | yarn rollup:dev:utils
# npx rollup --config=rollup/rollup.config.js --environment ENV_NAME:development,BUILD:production