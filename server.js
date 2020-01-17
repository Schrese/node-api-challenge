const express = require('express');

const coreRouter = require('./api/apiRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

//welcome page. would probably put a link to the readme here?
server.get('/', (req, res) => {
    res.send(`<h2>Welcome to my Projects/Actions API</h2>`)
})

//allows projects/actions to chain onto each other
server.use('/api', coreRouter);

//logs out from where and what request is coming in
function logger (req, res, next) {
    const {method, originalUrl} = req;
    console.log(`${method} to ${originalUrl}`);
    next();
}

module.exports = server;