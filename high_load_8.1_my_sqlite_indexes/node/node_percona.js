var mysql = require("mysql2");

function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "my-secret-pw",
    multipleStatements: true,
  });
}
var con1 = createConnection();
var con2 = createConnection();

function execute(query, con) {
  return new Promise(function (resolve, reject) {
    (con ?? con1).query(query, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function prepare(isolationLevel, phenomena) {
  await execute("CREATE DATABASE IF NOT EXISTS users_schema; COMMIT;");
  con1.changeUser({ database: "users_schema" });
  con2.changeUser({ database: "users_schema" });
  await execute(
    `SET SESSION TRANSACTION ISOLATION LEVEL ${isolationLevel};`,
    con1
  );
  await execute(
    `SET SESSION TRANSACTION ISOLATION LEVEL ${isolationLevel};`,
    con2
  );
  console.log(`\n\n${phenomena.toUpperCase()} - ${isolationLevel}`);
  await execute("DROP TABLE IF EXISTS dirtyReads; COMMIT;");
  await execute(
    "CREATE TABLE `dirtyReads` (`id` int unsigned NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `age` int unsigned NOT NULL,PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), KEY `index3` (`age`)); COMMIT;"
  );
  await execute(
    "INSERT INTO dirtyReads (name, age) VALUES ('user1', 1); COMMIT;"
  );
}

async function dirtyReads(isolationLevel) {
  await prepare(isolationLevel, "dirtyReads");
  const task = execute(`
    SELECT age FROM dirtyReads WHERE id = 1;
    DO SLEEP(1);
    SELECT age FROM dirtyReads WHERE id = 1;`);

  await execute(
    `
      START TRANSACTION;
      UPDATE dirtyReads SET age = 21 WHERE id = 1;
      DO SLEEP(2);
      ROLLBACK;
      COMMIT;
      `,
    con2
  );

  const res = await task;
  console.log(res[0]);
  console.log(res[2]);
}

async function phantomReads(isolationLevel) {
  await prepare(isolationLevel, "phantomReads");
  const task = execute(`
      START TRANSACTION;
      SELECT * FROM dirtyReads WHERE age BETWEEN 10 AND 30;
      DO SLEEP(2);
      SELECT * FROM dirtyReads WHERE age BETWEEN 10 AND 30;
      COMMIT;`);

  await execute(
    `
      START TRANSACTION;
      DO SLEEP(1);
      INSERT INTO dirtyReads(id, name, age) VALUES (3, 'Bob', 27);
      COMMIT;
      `,
    con2
  );

  const res = await task;
  console.log(res[1]);
  console.log(res[3]);
}

async function lostUpdates(isolationLevel) {
  await prepare(isolationLevel, "lostUpdates");
  const query = `
      START TRANSACTION;
      SELECT @Age := age FROM dirtyReads WHERE Id=1;
      SET @Age := @Age + 10;
      UPDATE dirtyReads SET age = @Age WHERE Id=1;
      COMMIT;  
`;


  try {
    await Promise.all([
      execute(query),
      execute(query, con2),]);

    const res = await execute("SELECT * FROM dirtyReads;", con2);
    console.log(res[0]);
  } catch {
    console.log('Deadlock error');
  }
}

async function nonRepeatableReads(isolationLevel) {
  await prepare(isolationLevel, "nonRepeatableReads");

  const t1 = execute(
    `
      START TRANSACTION;
      SELECT * FROM dirtyReads WHERE id = 1;
      DO SLEEP(2);
      SELECT * FROM dirtyReads WHERE id = 1;
      COMMIT;
      `,
    con2
  );

  await execute(`
      START TRANSACTION;
      DO SLEEP(1);
      UPDATE dirtyReads SET age = 21 WHERE id = 1; 
      COMMIT;
      `);

  const r1 = await t1;
  console.log(r1[1]);
  console.log(r1[3]);
}

async function run() {
  await dirtyReads("SERIALIZABLE");
  await dirtyReads("READ COMMITTED");
  await dirtyReads("READ UNCOMMITTED");
  await dirtyReads("REPEATABLE READ");

  await lostUpdates("REPEATABLE READ");
  await lostUpdates("READ COMMITTED");
  await lostUpdates("READ UNCOMMITTED");
  await lostUpdates("SERIALIZABLE");

  await nonRepeatableReads("READ COMMITTED");
  await nonRepeatableReads("READ UNCOMMITTED");
  await nonRepeatableReads("SERIALIZABLE");
  await nonRepeatableReads("REPEATABLE READ");

  await phantomReads("REPEATABLE READ");
  await phantomReads("READ COMMITTED");
  await phantomReads("READ UNCOMMITTED");
  await phantomReads("SERIALIZABLE");

}

run();
