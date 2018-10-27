#!/usr/bin/env nodejs
const http = require('http');
const config = require('./config');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: config.db.hostname,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const server = http.createServer((req, res) => {
    con.query("INSERT INTO demo () VALUES ();", function (err, result) {
        res.setHeader('Content-Type', 'text/plain');
        if(err) {
            res.statusCode = 500;
            res.end(`Error with database connection on ${config.hostname}: ${err}`);
            throw err;
        }
        res.statusCode = 200;
        console.log("Result: " + result);
        const id = result.insertId
        res.end(`Hello World from ${config.hostname} (${id})\n`);
    });
});

server.listen(config.port, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});