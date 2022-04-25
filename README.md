# Optrispace Frontend

## Development

Copy example config:

```sh
cp .env.local.example .env.local
```

In the project directory, you can run:

### `make setup`

Will install dependencies.

### `make run-dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `make lint`

Runs linter.

## Production

Before building Docker Image you need to copy and fill env config.\
This file will be copied to the target Docker Image.

```sh
cp .env.local.example .env.production
```

Now you will be able to build and run image:

### `make build-docker-image`

### `make run-docker-image`
