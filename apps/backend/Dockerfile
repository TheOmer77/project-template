FROM node:20.17.0-alpine3.20 AS base
ENV APP_NAME=backend
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apk add --no-cache gcompat dumb-init && corepack enable pnpm
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Install just turbo and generate partial monorepo with a pruned lockfile
FROM base AS prune

COPY package.json pnpm-lock.yaml ./
RUN apk add --no-cache yq && \
  TURBO_VERSION=$(yq e '.packages | keys | .[] | select(. == "turbo@*")' \
  pnpm-lock.yaml | cut -d '@' -f 2) && \
  pnpm install -D turbo@$TURBO_VERSION 
COPY . .
RUN pnpm turbo prune @repo/$APP_NAME --docker

# Development image - will get the actual project files from bind mount
FROM base AS dev

COPY --from=prune /app/out/json/package.json \
  /app/out/json/pnpm-lock.yaml ./
RUN pnpm fetch
COPY --from=prune /app/out/json/ .
RUN pnpm install -r --offline

USER node
CMD ["sh", "-c", "pnpm turbo dev -F @repo/$APP_NAME"]

# Production build - install deps & build
FROM base AS build

COPY --from=prune /app/out/json/package.json \
  /app/out/json/pnpm-lock.yaml ./
RUN pnpm fetch
COPY --from=prune /app/out/full/ .
RUN pnpm install -r --offline && pnpm turbo build -F @repo/$APP_NAME...

# Production image - copy just build files
FROM base AS prod
ENV NODE_ENV=production

COPY --from=build --chown=node:node /app/apps/$APP_NAME/dist ./dist

USER node
CMD ["node", "dist/index.js"]