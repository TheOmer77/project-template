ARG SERVICE_NAME=frontend

FROM node:18.14.2-alpine3.17
ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /app
COPY package*.json ./
COPY ./services/$SERVICE_NAME/package.json services/$SERVICE_NAME/
RUN npm install

# https://www.reddit.com/r/docker/comments/ww6rt5/comment/ir7jndi/
RUN mkdir /app/node_modules/.vite && \
  chown -R node:node /app/node_modules/.vite

CMD ["npm", "run", "dev", "-w", "${SERVICE_NAME}"]
