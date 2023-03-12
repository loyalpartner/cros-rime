cmake_minimum_required(VERSION 3.15)
project(cros_rime)

set(CMAKE_CXX_STANDARD 14)

set(emscripten_dir "/home/lee/projects/emsdk")

add_definitions(-std=c++14 -O3)

include_directories("${emscripten_dir}/upstream/emscripten/cache/sysroot/include")

# include_directories("build/sysroot/usr/local/include")
# include_directories("librime/src")
# include_directories("build/librime_wasm/src")


set(rime_api_wasm_src "src/decoder.cc")
add_executable(rime_api_wasm ${rime_api_wasm_src})
target_include_directories(rime_api_wasm PUBLIC 
  "src"
  "build/sysroot/usr/local/include"
  "librime/src"
  "build/librime_wasm/src"
  )
target_link_directories(rime_api_wasm PUBLIC "build/sysroot/usr/local/lib")
target_link_libraries(rime_api_wasm rime yaml-cpp leveldb marisa opencc :libboost_filesystem.bc)

set_target_properties(rime_api_wasm PROPERTIES LINK_FLAGS 
  "--bind -sERROR_ON_UNDEFINED_SYMBOLS=0 -pthread")
# target_link_libraries(rime_api_wasm yaml-cpp)



# browser
# add_executable(a wasm-module1.cpp reactive.cpp binding.cpp)
# set_target_properties(a PROPERTIES LINK_FLAGS "--bind -s ERROR_ON_UNDEFINED_SYMBOLS=0 --js-library  ${CMAKE_SOURCE_DIR}/library.js -O3")

# node backend module
# add_executable(a_node wasm-module1.cpp reactive.cpp binding.cpp)
# set_target_properties(a_node PROPERTIES LINK_FLAGS "--bind -s ERROR_ON_UNDEFINED_SYMBOLS=0 --js-library  ${CMAKE_SOURCE_DIR}/library.js -O3 -s WASM=1 -Wall -s MODULARIZE=1 -o a-node.js")

# webidl
# add_executable(hello hello.cpp glue_wrapper.cpp)
# set_target_properties(hello PROPERTIES LINK_FLAGS " -std=c++1y -O3 --post-js ${CMAKE_SOURCE_DIR}/glue.js")
