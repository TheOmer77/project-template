FROM node:20.17.0-alpine3.20 AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache gcompat dumb-init && corepack enable pnpm
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

FROM base AS prune

COPY packages packages
RUN find ./packages -mindepth 2 \( ! -name 'package.json' \) -delete 2>/dev/null

FROM base AS dev

COPY --from=prune /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm fetch
COPY --from=prune /app .
RUN pnpm install -r --offline

USER node
CMD ["./packages/run-all.sh", "build:watch"]
