.DEFAULT_GOAL := help

NPM := npm
NPM_RUN := ${NPM} run

help: # Show this help
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: # Setup project
	@${NPM} install

run: # Run dev server
	@${NPM_RUN} dev

lint: # Run lint
	@${NPM_RUN} lint
