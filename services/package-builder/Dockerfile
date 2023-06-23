FROM node:18.16.1-alpine3.18 as base

WORKDIR /app
COPY package*.json tsconfig.json .eslintrc.json .prettierrc ./
COPY patches patches
COPY packages/run-all.sh packages/run-all.sh

FROM node:18.16.1-alpine3.18

WORKDIR /app
COPY --from=base /app ./
RUN npm install

CMD ["./packages/run-all.sh", "build:watch"]
