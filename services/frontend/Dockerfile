FROM node:18.12.1-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

# https://www.reddit.com/r/docker/comments/ww6rt5/comment/ir7jndi/
RUN mkdir /app/node_modules/.vite && \
  chown -R node:node /app/node_modules/.vite

CMD ["npm", "run", "dev"]
