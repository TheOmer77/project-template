FROM node:18.16.0-alpine3.17 as base

WORKDIR /app
COPY package*.json .eslintrc.json .prettierrc ./
COPY patches patches
COPY packages packages
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:18.16.0-alpine3.17

WORKDIR /app
COPY --from=base /app ./
RUN npm install

CMD ["npm", "run", "build:watch", "-w", "packages/some-package"]
