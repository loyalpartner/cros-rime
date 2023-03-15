.PHONY: submodule lib wasm clean cleanwasm

submodule:
	git submodule update --init --recursive

lib:
	scripts/build_lib.sh

wasm:
	scripts/build_wasm.sh

clean:
	rm -rf build

cleanwasm:
	rm -rf build/rime_api_wasm
