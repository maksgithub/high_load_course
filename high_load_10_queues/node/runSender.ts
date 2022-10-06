import { connect, rPush, sendCommand } from "./common";
import { createServer, IncomingMessage, ServerResponse } from "http";

const indexName = "words";

async function run() {
  await connect();
  const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
      try {
        const res = await rPush();
        response.end(JSON.stringify(res, null, 2).toString());
      } catch (error) {
        response.end(JSON.stringify(error, null, 2).toString());
      }
    }
  );
  server.listen(8080);
}

run().catch(console.error);
