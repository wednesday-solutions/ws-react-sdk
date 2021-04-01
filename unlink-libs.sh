#!/bin/bash -x

dir=$(pwd)
yarn unlink
cd $dir/node_modules/react && yarn unlink
cd $dir/node_modules/react-dom && yarn unlink
cd $dir/node_modules/react-intl && yarn unlink
cd $dir/node_modules/antd && yarn unlink
cd $dir/node_modules/styled-components && yarn unlink 