const { v4: uuid } = require('uuid')
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path')

const logger = async (message, filename) => {
    console.log('Request came to logger', message)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const datetime = new Date().toLocaleString(undefined, options);
    const uniqueId = uuid();
    const appendText = `${datetime} \t ${uniqueId} \t ${message} \n`;
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromise.appendFile(path.join(__dirname, '..', 'logs', filename ? filename : 'log.txt'), appendText);
}

const loggerMiddleware = (req, res, next) => {
    logger(`${req.method} \t ${req.headers.origin} \t ${req.url}`, 'logs.txt');
    next();
}

module.exports = {
    logger, loggerMiddleware
}
