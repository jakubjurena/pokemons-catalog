###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.10-alpine3.18 as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# # for node-gyp for bcrypt
# RUN apk --update add --no-cache python3 make g++

RUN yarn install --frozen-lockfile

# COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.10-alpine3.18 as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn install --production

USER node

###################
# PRODUCTION
###################

FROM node:20.10-alpine3.18 as production

# COPY --chown=node:node --from=build /usr/src/app/.env ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
