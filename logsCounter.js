const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    fs.appendFile('./logs.txt', `Logged at ${Date.now()}-with ip:${req.ip}\n`, (err) => {
        if (err) {
            console.log(`Some error occured : ${err}`);
        }
    })
    next();
})

module.exports = app;