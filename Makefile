.DEFAULT_GOAL := help

NPM := npm
NPM_RUN := ${NPM} run
IMAGE_NAME := optrispace-web

help: # Show this help
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: # Setup project
	@${NPM} install

run-dev: # Run dev server
	@${NPM_RUN} dev

lint: # Run lint
	@${NPM_RUN} lint

build-docker-image: # Build Docker image
	docker build --no-cache -t ${IMAGE_NAME} .

run-docker-image: # Run Docker images
	docker run -p 3000:3000 ${IMAGE_NAME}
