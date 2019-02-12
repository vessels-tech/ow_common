#
# OW Types
# Common types for OW Projects
#

PATH := node_modules/.bin:$(PATH)
dir = $(shell pwd)
NPM_VERSION_NUMBER := $(shell node ./tools/getVersionNumber.js)


all: build

build:
	@make unit-test
	yarn run build

type-check:
	yarn run type-check

build-watch:
	yarn run type-check:watch

unit-test:
	@make type-check
	yarn run unit


publish:
	# TODO: look into using npm patch instead!
	@echo 'Publishing $(NPM_VERSION_NUMBER) to NPM!'
	npm publish
	git tag $(NPM_VERSION_NUMBER)
	git push origin $(NPM_VERSION_NUMBER)



.PHONY: build