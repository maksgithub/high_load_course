import delay from "delay";
import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6380",
  password: "str0ng_passw0rd",
});

type Record = { value: string, delta: number }

export async function connect() {
  console.log("Start connecting...");
  await client.connect();
  console.log("Connected successfully");

  client.on("error", (err) => {
    console.log("Error: " + err);
  });
}

export async function sendCommand<T>(
  cmd: string,
  silent = true
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

export async function printAllKeys(): Promise<void> {
  const keys = await sendCommand<string[]>("KEYS *");
  console.log({ keys });
}

export async function writeKey(key: string, ttl: number): Promise<string> {
  const start = Date.now();
  const value = await recomputeValue();
  const delta = Date.now() - start;
  await setKey(key, { value, delta }, ttl);
  return await sendCommand<string>(`GET ${key}`);
}

export async function fetch(key: string, newTtl: number, beta = 1) {
  const result = await sendCommand<string>(`GET ${key}`)
  if (!result) {
    return writeKey(key, newTtl);
  }
  const { value, delta } = JSON.parse(result);
  const ttl = await sendCommand<number>(`TTL ${key}`);
  const expire = Date.now() + ttl * 1000;
  const res = Date.now() - delta * beta * Math.log(Math.random());
  if (!value || res >= expire) {
    return writeKey(key, newTtl);
  }
  return await sendCommand<string>(`GET ${key}`);
}

export function generateValue(len: number): string {
  let res = "";
  for (let i = 0; i < len; i++) {
    res += "A";
  }
  return res;
}


async function setKey<T>(key: string, value: T, ttl?: number): Promise<void> {
  await sendCommand(`SET ${key} ${JSON.stringify(value)}`);
  if (ttl) {
    await sendCommand(`EXPIRE ${key} ${ttl}`);
  }
}

let c = 0;
async function recomputeValue(): Promise<string> {
  c += 1;
  await delay(1200);
  return `value_${c}`;
}