#
# OW Types
# Common types for OW Projects
#

PATH := node_modules/.bin:$(PATH)
dir = $(shell pwd)


all: build

build:
	# @make unit-test
	yarn run build

type-check:
	yarn run type-check

build-watch:
	yarn run type-check:watch

unit-test:
	@make type-check
	yarn run unit

.PHONY: build