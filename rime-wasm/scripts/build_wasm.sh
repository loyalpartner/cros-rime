#!/bin/bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_DIR="$SCRIPT_DIR/.."

goto_dir_exec_cmd(){
  local dir="$1"
  local cmd=${@:2}

  if [[ -z $dir || ${#cmd} -eq 0 ]]; then
    echo "invalid params: goto_dir_exec_cmd" && exit 1
  fi

  pushd $dir
  ${cmd[@]}
  popd
}



if [ ! -a "worker/out/index.js" ]; then
  goto_dir_exec_cmd worker yarn build
fi

if [ $? != 0 ]; then
  echo "build worker error" && exit 1
fi

emcmake cmake . -Bbuild/rime_api_wasm \
  -DCMAKE_FIND_ROOT_PATH:PATH=build/sysroot/usr/local
cmake --build build/rime_api_wasm --clean-first -v
