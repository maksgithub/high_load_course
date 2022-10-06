import { createClient } from "redis";
import { generateValue } from "../../high_load_9.1_redis/node/common";

const client = createClient({
  url: "redis://localhost:6380",
  // password: "str0ng_passw0rd",
});

const multi = client.multi();

export async function connect() {
  console.log("Start connecting...");
  await client.connect();
  console.log("Connected successfully");

  client.on("error", (err) => {
    console.log("Error: " + err);
  });

  await sendCommand("config get appendonly");
  await sendCommand("config get save");
}

let c = 0;

export async function rPush() {
  const data = {
    data: generateValue(1000),
    counter: c += 1
  }
  return await client.rPush('queue', JSON.stringify(data));
  // return await multi.exec();
}

export async function lPop() {
  return await client.rPop('queue');
}

export async function sendCommand<T>(
  cmd: string,
  silent = false
): Promise<T> {
  if (!silent) {
    console.log("\nStart executing command: ", cmd);
  }
  const command = cmd.split(" ");
  const result = await client.sendCommand<T>(command);
  if (!silent) {
    console.log({ result }, "\n");
  }
  return result;
}
