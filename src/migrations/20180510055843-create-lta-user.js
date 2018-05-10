'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'user_id',
                unique: true
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'user_name'
            },
            emailId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'email_id'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_user');
    }
};