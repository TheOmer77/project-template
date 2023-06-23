ARG SERVICE_NAME=backend

FROM node:18.16.0-alpine3.18 as base
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

WORKDIR /app
COPY package*.json tsconfig.json .eslintrc.json .prettierrc ./
COPY patches patches
COPY packages packages
COPY services/$SERVICE_NAME/package.json services/$SERVICE_NAME/
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:18.16.0-alpine3.18
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

WORKDIR /app
COPY --from=base /app ./
RUN npm install

CMD ["npm", "-w", "services/${SERVICE_NAME}", "run", "dev"]