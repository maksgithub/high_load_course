import { connect, generateValue, sendCommand } from "./common";
import { createServer, IncomingMessage, ServerResponse } from "http";

const indexName = "words";




async function run() {
  await connect();
  const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
      try {
        const searchRes = await search(indexName, request.url);
        response.end(JSON.stringify(searchRes, null, 2).toString());
      } catch (error) {
        response.end(JSON.stringify(error, null, 2).toString());
      }
    }
  );
  server.listen(8080);
}

run().catch(console.error);
