import { createRedisClient } from "./common";

async function run() {
  const client = await createRedisClient();
}

run().catch(console.error);
