var Sequelize = require('sequelize');
var sequelize = require('../connection/connection');

/**
 * User Model
 */
module.exports = function() {
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
        },
        associate: function (models) {
            User.belongsTo(models.Role, {
                foreignKey: {
                    name: 'roleId',
                    allowNull: false
                },
                onDelete: 'cascade'
            });
        }
    });
    return User;
};