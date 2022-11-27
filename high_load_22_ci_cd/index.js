const express = require('express');
const app = express();
const port = 8080;


app.get('/status', (req, res) => res.send({status: "I'm up and running"}));
app.listen(port, () => console.log(`Dockerized Nodejs Applications is listening on port ${port}!`));
