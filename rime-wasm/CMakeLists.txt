cmake_minimum_required(VERSION 3.15)
project(cros_rime)

# set(CMAKE_CXX_STANDARD 14)

set(emscripten_dir "/home/lee/projects/emsdk")

add_definitions(-std=c++14 -O3)

include_directories("${emscripten_dir}/upstream/emscripten/cache/sysroot/include")

set(rime_api_wasm_src "src/decoder.cc")
add_executable(pthread ${rime_api_wasm_src})
target_include_directories(pthread PUBLIC 
  "src"
  "build/sysroot/usr/local/include"
  "librime/src"
  "build/librime_wasm/src"
  )
target_link_directories(pthread PUBLIC "build/sysroot/usr/local/lib")
target_link_libraries(
  pthread
  rime
  yaml-cpp
  leveldb
  marisa
  opencc
  :libboost_filesystem.bc
  embind
  idbfs.js)

set(prejs_flag "--pre-js=${PROJECT_SOURCE_DIR}/worker/out/index.js")
set(postjs_flag "--post-js=${PROJECT_SOURCE_DIR}/worker/post.js")

set_target_properties(pthread PROPERTIES LINK_FLAGS 
  "--bind -O1 -sERROR_ON_UNDEFINED_SYMBOLS=0 ${prejs_flag} ${postjs_flag}  -pthread")
