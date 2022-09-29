import { createClient } from "redis";

export async function createRedisClient() {
  const client = createClient({
    url: "redis://localhost:6380",
    password: "str0ng_passw0rd",
  });

  console.log("Start connecting...");
  await client.connect();
  console.log("Connected successfully");

  client.on("error", (err) => {
    console.log("Error " + err);
  });

  client.set("name", "Flavio");
  client.set("age", 37);
  const value = await client.get("name");
  console.log({value});

  return client;
}
