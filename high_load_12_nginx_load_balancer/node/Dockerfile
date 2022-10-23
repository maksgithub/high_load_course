FROM node:16
WORKDIR /app

COPY . .
RUN npm i

ENTRYPOINT ["node", "-r", "ts-node/register/transpile-only", "run.ts"]