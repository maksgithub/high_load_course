import { connect, generateValue, sendCommand } from "./common";

async function run() {
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

  for (let i = 0; i < 5; i++) {
    try {
    //   await sendCommand(`GET name${i}`);

    } catch (error) {
      break;
    }
  }
  const keys = await sendCommand<string[]>("KEYS *", true);
  console.log(keys.sort((n1, n2) => (n1 > n2 ? 1 : -1)));
}

run().catch(console.error);
