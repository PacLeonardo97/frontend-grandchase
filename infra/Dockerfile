FROM node:22-alpine

WORKDIR /src

COPY package.json yarn.lock /src/ /public/ /messages/

RUN yarn install

COPY . /src/

RUN yarn build
