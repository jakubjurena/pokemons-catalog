# Description

Pokemon info API

# Main features

- investigation scripts to analalyze JSON (later reused on seed)
- test are implemented mainly on `pokemon.service`, `pokemon.controller` and e2e test for one pokemon endpoint (`setPokemonFavorite`)
- Bearer auth is simplified token (I did not used JWT service to easier usage in swagger)
  - token is `access_token_${email}` - only seeded user is `jakub.jurena@gmail.com` (`access_token_jakub.jurena@gmail.com`)
  - there are 3 auth routes
    - `PATCH pokemon/:id/favorite` - to patch pokemon favorite
    - `GET user/me` - to get user info
    - `GET user/favorites` - to get user's favorite pokemons
- You can run `docker-compose up` to run full aplication - urls are logged in console (swagger, app)
- Docker has heatcheck to ensure that api is called after postgres db is correcty set up

# Docker start up

It will start up everything

```bash
$ docker compose up
```

# Local development and tests

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Investigation

Few scripts for data investigation.

```bash
# Console log info about attacks from JSON
$ investigate:attacks

# Console log info about classifications from JSON
$ investigate:class

# Console log info about pokemon keys object
$ investigate:key

# Console log info about pokemon types
$ investigate:type
```

## Seed

TypeORM seed

```bash
$ yarn run seed
```

## Migrations

- Docker automaticaly run migrations

```bash
$ yarn run migration:generate # generate migrations
$ yarn run migration:run # run migrations
$ yarn run migration:revert # revert last migration
```

## Database schema

Schema is described in `pokemon-schema.drawio.svg`.
