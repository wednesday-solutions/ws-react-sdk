#!/bin/bash -x

./unlink-libs.sh
dir=$(pwd)
yarn link
cd $dir/node_modules/react && yarn link 
cd $dir/node_modules/react-dom && yarn link 
cd $dir/node_modules/antd && yarn link 
cd $dir/node_modules/styled-components && yarn link 
cd $dir/node_modules/react-intl && yarn link 
