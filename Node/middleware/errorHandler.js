const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack, 'In error handler');
    logger(`${err.name} \t ${err.message}`,'errorLog.txt');
    res.status(500).send(err.message)
}
module.exports = errorHandler;