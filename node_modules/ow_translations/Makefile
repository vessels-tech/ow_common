#
# OW Translations
# OW Translation manager
#

PATH := node_modules/.bin:$(PATH)
dir = $(shell pwd)


all: parse build update

build:
	yarn run build

clean:
	rm -rf ${dir}/src/common/*

lazy_build:
	yarn run lazy_build

parse:
	node ./lib/parser.js

update: 
	git commit -am "update translations" ; git push ; git log | head -1

.PHONY: build parse