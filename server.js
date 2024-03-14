const express = require('express');

const server = express();

server.all("/", (req, res) => {
  res.send("Bot is running!");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive

/*
put this in index.js
if you forgot, later you put in the beginning
//for reach monitor to server
const keepAlive = require('./server');
also put this before token
//this is run the server monitor
keepAlive()
*/