var Sequelize = require('sequelize');
var dataSource = require('../../config/datasources.config');

/**
 * Script to Establish connection to the database
 * Opens a new connection only when there is no existing connection
 */
var connection = new Sequelize(
    dataSource.app.name,
    dataSource.app.username,
    dataSource.app.password,
    {
        host: dataSource.app.host,
        dialect: dataSource.app.dialect,
        pool: dataSource.app.pool,
    }
);

module.exports = connection;
