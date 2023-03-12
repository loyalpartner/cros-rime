.PHONY: submodule lib rime_api_wasm

submodule:
	git submodule update --init --recursive

lib:
	scripts/build_lib.sh

rime_api_wasm:
	emcmake cmake . -Bbuild/rime_api_wasm \
		-DCMAKE_FIND_ROOT_PATH:PATH=build/sysroot/usr/local
	cmake --build build/rime_api_wasm

clean:
	rm -rf build/rime_api_wasm
