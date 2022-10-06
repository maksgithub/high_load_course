import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6380",
  password: "str0ng_passw0rd",
});

const multi = client.multi();

export async function connect() {
  console.log("Start connecting...");
  await client.connect();
  console.log("Connected successfully");

  client.on("error", (err) => {
    console.log("Error: " + err);
  });
}

let c = 0;

export async function rPush() {
  const data = {
    data: c += 1
  }
  await multi.rPush('queue', JSON.stringify(data));
}

export async function lPop() {
  return await multi.lPop('queue');
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
