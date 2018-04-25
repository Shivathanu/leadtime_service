var Sequelize = require('sequelize');
var sequelize = require('../connection/connection');

var User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        isEmail: true
    }
});

module.exports = User;
