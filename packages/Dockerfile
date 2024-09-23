FROM node:20.17.0-alpine3.20 AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache gcompat dumb-init && corepack enable pnpm
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

FROM base AS prune

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages packages
RUN find ./packages -mindepth 2 \( ! -name 'package.json' \) -delete 2>/dev/null

FROM base AS dev

COPY --from=prune /app .
RUN apk add --no-cache gcompat jq && pnpm install --frozen-lockfile

USER node
CMD ["sh","-c", "./packages/dev-all.sh"]
