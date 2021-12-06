const app = require('express')();

const port = process.env.PORT || 5050;

const handler = require('../requestHandler');

app.post('/api', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  let reqData = "";
  if(req.method == "POST"){
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    reqData = JSON.parse(Buffer.concat(buffers).toString());
  }

  if(req.method == "OPTIONS"){ //CORS ERROR FIX
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.end();
  }else{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
  }

  if(req.url == "/api"){
    try {
      retval = await handler.handleRequest(reqData);
      res.end(JSON.stringify(retval));
    } catch (error) {
      res.statusCode = error.statusCode;
      res.end(error.msg);
    }
  }
  res.statusCode = 400;
  res.end();
  
});

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(`Hello!`);
});


module.exports = app;