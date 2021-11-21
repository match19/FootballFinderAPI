const http = require('http');

const hostname = 'localhost';
const port = 3000;

const handler = require('./requestHandler');

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const reqData = JSON.parse(Buffer.concat(buffers).toString());

  try {
    retval = await handler.handleRequest(reqData);
    res.end(JSON.stringify(retval));
  } catch (error) {
    res.statusCode = error.statusCode;
    res.end(error.msg);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});