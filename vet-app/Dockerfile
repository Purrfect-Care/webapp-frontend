FROM node:20.3.0-alpine

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

RUN npm install react-scripts -g --silent

COPY . .