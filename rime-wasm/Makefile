.PHONY: submodule lib api

submodule:
	git submodule update --init --recursive

lib:
	scripts/build_lib.sh

api:
	emcmake . -Bbuild/api
