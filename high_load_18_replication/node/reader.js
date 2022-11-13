var mysql = require("mysql2");
var delay = require("delay");

function createConnection(port) {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111",
    port,
    multipleStatements: true,
  });
}

var con1;
var con2;

function handleDisconnect1() {
  con1 = createConnection(5506);

  con1.connect(function (err) {
    if (err) {
      setTimeout(handleDisconnect1, 2000);
    }
    else {
      con1.changeUser({ database: "mydb" });
    }
  });

  con1.on('error', function (err) {
    setTimeout(handleDisconnect1, 2000);
  });
}

function handleDisconnect2() {
  con2 = createConnection(5507);
  con2.changeUser({ database: "mydb" });

  con2.connect(function (err) {
    if (err) {
      setTimeout(handleDisconnect2, 2000);
    }
    else {
      con2.changeUser({ database: "mydb" });
    }
  });

  con2.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect2();
    } else {
      throw err;
    }
  });
}


handleDisconnect2();
handleDisconnect1();

async function execute(query, con) {
  try {

    const res = await new Promise(function (resolve, reject) {
      con.query(query, function (err, result) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
    return res;
  }
  catch (e){
    return e
  }
}

async function run() {
  for (var i = 0; i < 1000; i++) {
    await delay(900);
    const res1 = await execute(
      `SELECT COUNT(*) AS CountOfUsers FROM dirtyReads;`,
      con1
    );
    const res2 = await execute(
      `SELECT COUNT(*) AS CountOfUsers FROM dirtyReads;`,
      con2
    );
    console.log('slave1: ', res1);
    console.log('slave2: ', res2);
    console.log();
  }
}

run();
