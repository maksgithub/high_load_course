import delay from "delay"
import { connect, fetch, generateValue, sendCommand } from "./common";

function getTime() {
  return new Date().toLocaleString(undefined, { hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' });
}

async function tryEvictionStrategy() {
  await connect();
  await sendCommand("FLUSHALL");
  await sendCommand("config set maxmemory 1250kb");
  await sendCommand("config set maxmemory-policy allkeys-lru");
  await sendCommand("config get maxmemory-policy");
  await sendCommand("config get maxmemory");
  const value = generateValue(1600);
  for (let i = 0; i < 12; i++) {
    try {
      await sendCommand(`set name${i} ${value}`, true);
    } catch (error) {
      break;
    }
  }

  const keys = await sendCommand<string[]>("KEYS *", true);
  console.log(keys.sort((n1, n2) => (n1 > n2 ? 1 : -1)));
}

async function run() {
  await connect();
  const key = 'key_3';
  const ttl = 60;
  await fetch(key, ttl);


  while (true) {
    await delay(2000);
    const res = await fetch(key, ttl);
    const val = JSON.parse(res);
    const time = getTime();
    console.log(time, val.value);
  }
}

run().catch(console.error);
