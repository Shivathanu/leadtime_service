var Sequelize = require('sequelize');
var sequelize = require('../connection/connection');

/**
 * User Model
 */
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
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    hooks: {
        beforeSave: function (user) {
            user.updatedAt = new Date();
        }
    }
});

module.exports = User;
