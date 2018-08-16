#!/bin/bash

export env="{\"mode\":\"development\",\"features\":{\"html\":true},\"project\":\"$1\"}"

webpack-dev-server --config "./conf/webpack.config.js" --color --host dev.iqiyi.com