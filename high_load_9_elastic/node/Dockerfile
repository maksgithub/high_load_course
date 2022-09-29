FROM node:16
WORKDIR /app

COPY . .
RUN npm i
RUN npm run init

ENTRYPOINT ["node", "-r", "ts-node/register/transpile-only", "search.ts"]