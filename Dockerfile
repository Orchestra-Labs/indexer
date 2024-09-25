FROM node:20-alpine as development

WORKDIR /usr/src/app

RUN npm install -g pnpm @nestjs/cli

COPY --chown=indexer:indexer package.json ./
COPY --chown=indexer:indexer pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=indexer:indexer . .

USER indexer

FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY --chown=indexer:indexer package.json ./
COPY --chown=indexer:indexer pnpm-lock.yaml ./

COPY --chown=indexer:indexer --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=indexer:indexer . .

RUN npm install -g pnpm
RUN pnpm build

USER indexer

FROM node:20-alpine as runtime_with_migration

WORKDIR /usr/src/app

COPY --chown=indexer:indexer migrations ./
COPY --chown=indexer:indexer --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=indexer:indexer . .

RUN npm install -g pnpm
RUN pnpm build

ENTRYPOINT ["sh", "migrate_and_run.sh"]

FROM node:20-alpine as runtime

COPY --chown=indexer:indexer --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=indexer:indexer --from=build /usr/src/app/dist ./dist

ENTRYPOINT ["node", "dist/main.js"]