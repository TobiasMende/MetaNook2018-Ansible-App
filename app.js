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

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = http.createServer((req, res) => {
  con.query("INSERT INTO demo () VALUES ();", function (err, result) {
    res.setHeader('Content-Type', 'text/html');
    if (err) {
      res.statusCode = 500;
      res.end(`Error with database connection on ${config.hostname}: ${err}`);
      throw err;
    }
    res.statusCode = 200;
    console.log("Result: " + result);
    res.end(body(result.insertId, config.hostname));
  });
});

server.listen(config.port, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});

const body = (id, hostname) => {
  return `
  <style type="text/css">
  body {font-family: Arial, sans-serif; }
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-top-width:1px;border-bottom-width:1px;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-top-width:1px;border-bottom-width:1px;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-0lax{text-align:left;vertical-align:top}
@media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;}}</style>
  <h1>Hello MetaNook 2018!</h1> 
<div class="tg-wrap"><table class="tg">
<tr>
<td class="tg-0lax"><strong>Host:</strong></td>
<td class="tg-0lax">${hostname}</td>
</tr>
<tr>
<td class="tg-0lax"><strong>ID:</strong></td>
<td class="tg-0lax">${id}</td>
</tr>
</table></div>`;
}