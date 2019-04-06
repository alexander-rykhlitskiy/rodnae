FROM node:11-alpine

WORKDIR /app

COPY package.json .
RUN npm install --quiet
