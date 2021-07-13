#!/bin/bash
rm -rf lib

for arg in "$@"
do
    case $arg in
        -w|--watch)
        WATCH=1
    esac
done

ENV_NAME=development FOLDER=$1 WATCH=$WATCH node rollup/roller.js
