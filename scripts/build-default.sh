#!/bin/bash

export env="{\"mode\":\"production\",\"features\":{\"html\":true},\"project\":\"$1\"}"

webpack --config "./conf/webpack.config.js" --progress --color