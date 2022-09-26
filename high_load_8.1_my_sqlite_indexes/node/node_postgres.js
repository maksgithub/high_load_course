const { Pool, Client } = require('pg')


function createConnection() {
  return new Pool({
    user: 'postgres',
    password: 'Password123',
    port: 5432
  });
}
const con = createConnection();

con.connect();

async function prepare(isolationLevel, phenomena) {
  try {
    await con.query('CREATE DATABASE users_schema;');
  } catch {
  }
  con.database = 'users_schema';
  await con.query(
    `SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL ${isolationLevel};`
  );
  console.log(`\n\n${phenomena.toUpperCase()} - ${isolationLevel}`);
  console.log((await con.query('SHOW transaction_isolation')).rows);
  await con.query("DROP TABLE IF EXISTS dirtyReads; COMMIT;");
  await con.query(
    "CREATE TABLE dirtyReads (id int PRIMARY KEY NOT NULL, name varchar(100) NOT NULL, age int NOT NULL);"
  );
  await con.query(
    "INSERT INTO dirtyReads (id, name, age) VALUES (1, 'user1', 1); COMMIT;"
  );
}

async function dirtyReads(isolationLevel) {
  await prepare(isolationLevel, "dirtyReads");
  const task = con.query(`
      START TRANSACTION;
      SELECT * FROM dirtyReads WHERE id = 1;
      SELECT pg_sleep(2);
      SELECT * FROM dirtyReads WHERE id = 1;
      COMMIT;`);

  await con.query(
    `
      START TRANSACTION;
      UPDATE dirtyReads SET age = 21 WHERE id = 1;
      SELECT pg_sleep(4);
      ROLLBACK;
      COMMIT;
      `
  );

  const res = await task;
  console.log(res[1].rows);
  console.log(res[3].rows);
}

async function nonRepeatableReads(isolationLevel) {
  await prepare(isolationLevel, "nonRepeatableReads");

  const t1 = con.query(
    `
      START TRANSACTION;
      SELECT * FROM dirtyReads WHERE id = 1;
      SELECT pg_sleep(2);
      SELECT * FROM dirtyReads WHERE id = 1;
      COMMIT;
      `
  );

  await con.query(`
      START TRANSACTION;
      SELECT pg_sleep(1);
      UPDATE dirtyReads SET age = 21 WHERE id = 1; 
      COMMIT;
      `);

  const r1 = await t1;
  console.log(r1[1].rows);
  console.log(r1[3].rows);
}

async function phantomReads(isolationLevel) {
  await prepare(isolationLevel, "phantomReads");
  const task = con.query(`
      START TRANSACTION;
      SELECT * FROM dirtyReads WHERE age BETWEEN 10 AND 30;
      SELECT pg_sleep(2);
      SELECT * FROM dirtyReads WHERE age BETWEEN 10 AND 30;
      COMMIT;`);

  await con.query(
    `
      START TRANSACTION;
      SELECT pg_sleep(1);
      INSERT INTO dirtyReads(id, name, age) VALUES (3, 'Bob', 27);
      COMMIT;
      `
  );

  const res = await task;
  console.log(res[1].rows);
  console.log(res[3].rows);
}

async function lostUpdates(isolationLevel) {
  await prepare(isolationLevel, "lostUpdates");
  const query = `
      do $$
      declare 
        actor_count integer; 
      begin
        SELECT age into actor_count FROM dirtyReads WHERE Id=1;
        actor_count := actor_count + 10;
        UPDATE dirtyReads SET age = actor_count WHERE Id=1;
      end; $$;
`;

  try {

    await Promise.all([
      con.query(query),
      con.query(query),
      con.query(query),
      con.query(query),
      con.query(query),
    ]);
    const res = await con.query("SELECT * FROM dirtyReads;");
    console.log(res.rows);
  } catch (error) {
    console.log('error');
  }
}

async function run() {

  await nonRepeatableReads("READ COMMITTED");
  await nonRepeatableReads("READ UNCOMMITTED");
  await nonRepeatableReads("SERIALIZABLE");
  await nonRepeatableReads("REPEATABLE READ");

  await dirtyReads("READ UNCOMMITTED");
  await dirtyReads("READ COMMITTED");
  await dirtyReads("SERIALIZABLE");
  await dirtyReads("REPEATABLE READ");

  await phantomReads("REPEATABLE READ");
  await phantomReads("READ COMMITTED");
  await phantomReads("READ UNCOMMITTED");
  await phantomReads("SERIALIZABLE");

  await lostUpdates("SERIALIZABLE");
  await lostUpdates("REPEATABLE READ");
  await lostUpdates("READ COMMITTED");
  await lostUpdates("READ UNCOMMITTED");
}

run();
