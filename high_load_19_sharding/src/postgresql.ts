import { Client, Configuration } from 'ts-postgres';

export function createClient(host: string) {
  const config: Configuration = {
    host,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  };
  console.log('Create client with config', host);
  return new Client(config);
}
