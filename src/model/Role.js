var Sequelize = require('sequelize');
var sequelize = require('../connection/connection');

/**
 * Role Model
 */
module.exports = function() {
    var Role = sequelize.define('Role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    }, {
        hooks: {
            beforeSave: function (role) {
                role.updatedAt = new Date();
            }
        },
        associate: function (models) {
            Role.hasMany(models.User, { 
                foreignKey: {
                    name: 'roleId',
                    allowNull: false
                },
                onDelete: 'cascade'
            });
        }
    });
    return Role;
};
