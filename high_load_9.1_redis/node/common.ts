import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6380",
  password: "str0ng_passw0rd",
});

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

export function generateValue(len: number): string {
  let res = "";
  for (let i = 0; i < len; i++) {
    res += "A";
  }
  return res;
}
