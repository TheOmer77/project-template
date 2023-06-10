FROM node:18.16.0-alpine3.18 as base

WORKDIR /app
COPY package*.json .eslintrc.json .prettierrc ./
COPY patches patches
COPY packages/run-all.sh packages/run-all.sh
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:18.16.0-alpine3.18

WORKDIR /app
COPY --from=base /app ./
RUN npm install

CMD ["./packages/run-all.sh", "build:watch"]
