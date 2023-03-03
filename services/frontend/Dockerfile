FROM node:18.14.2-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

# https://www.reddit.com/r/docker/comments/ww6rt5/comment/ir7jndi/
RUN mkdir /app/node_modules/.vite && \
  chown -R node:node /app/node_modules/.vite

CMD ["npm", "run", "dev"]
