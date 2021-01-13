require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "Server is up!",  testObject: process.env.TEST});
});

module.exports = server;