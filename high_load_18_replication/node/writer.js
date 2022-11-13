var mysql = require("mysql2");
var delay = require("delay");

function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111",
    port: 4306,
    multipleStatements: true,
  });
}
var con = createConnection();

function execute(query) {
  return new Promise(function (resolve, reject) {
    con.query(query, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function prepare() {
  await execute("CREATE DATABASE IF NOT EXISTS mydb; COMMIT;");
  con.changeUser({ database: "mydb" });
  await execute("DROP TABLE IF EXISTS dirtyReads; COMMIT;");
  await execute(
    "CREATE TABLE `dirtyReads` (`id` int unsigned NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `age` int unsigned NOT NULL,PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), KEY `index3` (`age`)); COMMIT;"
  );
}

async function run() {
  await prepare();
  for (var i = 0; i < 1000; i++) {
    await delay(900);
    await execute(
      `INSERT INTO dirtyReads (name, age) VALUES ('user${i}', ${i}); COMMIT;`
    );
    console.log('writer', i);
  }
}

run();
