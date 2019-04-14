FROM node:11-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

CMD npm start
