const moment = require('moment');

// Middleware to log something
// Runs everytime there is a request.
const logger = (req, res, next) => {
    console.log('Hello I am logger');
    // Protocol: http, host: localhost:5000, originalUrl: /api/members
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;
