#!/usr/bin/env nodejs
const http = require('http');
const config = require('./config')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello World from ${config.hostname}\n`);
});

server.listen(config.port, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});