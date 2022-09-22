var mysql = require("mysql2");
const http = require("http");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my-secret-pw",
  database: "users_schema",
});

const requestListener = function (req, res) {
  res.writeHead(200);

  con.connect(function (err) {
    if (err) throw err;
    con.query("INSERT INTO users (name, age) VALUES ('user', RAND()*(100-1)+1);", function (err, result) {
      if (err) throw err;
      res.writeHead(200);
      console.log(result);
      res.end(JSON.stringify(result).toString());
    });
  });
};

const server = http.createServer(requestListener);
server.listen(8080);
