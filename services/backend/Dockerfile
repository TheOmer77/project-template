FROM node:18.13.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]