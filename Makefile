#
# OW Types
# Common types for OW Projects
#

PATH := node_modules/.bin:$(PATH)
dir = $(shell pwd)


all: build

build:
	yarn run build

clean:
	rm -rf ${dir}/src/common/*


unit-test:
	yarn run unit

.PHONY: build