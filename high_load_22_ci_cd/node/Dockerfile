FROM node:latest as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test
RUN npm ci
COPY . .
RUN npm run test

FROM base as integration
RUN npm ci
COPY . .
RUN npm run test:integration

FROM base as prod
ENV SERVER_PORT=8080
RUN npm ci --production
COPY . .
CMD [ "node", "index.js" ]