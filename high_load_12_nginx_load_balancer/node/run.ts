import { createServer, IncomingMessage, ServerResponse } from "http";

let counter = 0;

async function run() {
  const server = createServer(
    async (_request: IncomingMessage, response: ServerResponse) => {
      counter++;
      if (counter > 5  && process.env.SERVER !== 'backup') {
        throw new Error('Counter greater than 5 error');
      }
      response.end(JSON.stringify({ response: `hello from ${process.env.SERVER}` }, null, 2).toString());
    }
  );
  server.listen(4000);
}

run().catch(console.error);
