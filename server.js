const http = require('http');

const { Client } = require('pg')
const client = new Client({
    user: 'ttxwvksu',
    host: 'abul.db.elephantsql.com',
    database: 'ttxwvksu',
    password: 'lB1FYYY7AfT-EO-k1ZK4maLDT_nxL522',
    port: 5432,
  })
  client.connect()
  

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("url: "+ req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  client.query('SELECT * FROM ttxwvksu.public.orders o', (err, sqlRes) => {
    res.end(JSON.stringify(sqlRes.rows));

  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});