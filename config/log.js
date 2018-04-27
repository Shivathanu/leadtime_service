var winston = require('winston');
var fs = require('fs');
var path = require('path');
var date = new Date().getDate() + '_' + (new Date().getMonth() + 1) +
    '_' + new Date().getFullYear();

var infoLogger = path.join(__dirname, '../log/info_' + date + '.log');
var errorLogger = path.join(__dirname, '../log/error_' + date + '.log');

if(!fs.existsSync(infoLogger)) {
    fs.openSync(infoLogger, 'a+');
}

if(!fs.existsSync(errorLogger)) {
    fs.openSync(errorLogger, 'a+');
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: infoLogger,
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: errorLogger,
            level: 'error'
        }),
    ]
});

module.exports = logger;
