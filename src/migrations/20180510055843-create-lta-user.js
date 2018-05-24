'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_user', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING,
                field: 'user_id',
                unique: true,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name',
                allowNull: false
            },
            middleName: {
                type: Sequelize.STRING,
                field: 'middle_name'
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name'
            },
            fullName: {
                type: Sequelize.STRING,
                field: 'full_name',
                allowNull: false                
            },
            emailId: {
                type: Sequelize.STRING,
                field: 'email_id',
                allowNull: false
            },
            roleId: {
                type: Sequelize.STRING,
                field: 'role_id',
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
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