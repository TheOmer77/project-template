ARG SERVICE_NAME=frontend

FROM node:18.16.0-alpine3.17 as base
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

WORKDIR /app
COPY package*.json .eslintrc.json .prettierrc ./
COPY patches patches
COPY packages packages
COPY services/$SERVICE_NAME/package.json services/$SERVICE_NAME/
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:18.16.0-alpine3.17
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

WORKDIR /app
COPY --from=base /app ./
RUN npm install

# https://www.reddit.com/r/docker/comments/ww6rt5/comment/ir7jndi/
RUN mkdir /app/node_modules/.vite && \
  chown -R node:node /app/node_modules/.vite

CMD ["npm", "-w", "services/${SERVICE_NAME}", "run", "dev"]
