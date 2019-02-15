// jshint esversion: 6
var jsDoc = require('swagger-jsdoc');

var definition = {
  openapi: '3.0.0',
  info: {
    title: 'LeadTime Dashboard API',
    version: '1.0.0',
    description: 'Documentation for all leadtime dashboard api',
  }
};

var options = {
  definition,
  apis: [__dirname + '\\..\\paths\\**.yaml']
};

module.exports = jsDoc(options);
