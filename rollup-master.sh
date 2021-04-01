#!/bin/bash
rm -rf lib
yarn rollup:dev:services --environment ENV_NAME:production,BUILD:production | \
yarn rollup:dev:themes --environment ENV_NAME:production,BUILD:production | \
yarn rollup:dev:components --environment ENV_NAME:production,BUILD:production | \
yarn rollup:dev:utils --environment ENV_NAME:production,BUILD:production
# npx rollup --config=rollup/rollup.config.js --environment ENV_NAME:production,BUILD:production