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
                type: Sequelize.STRING(50),
                field: 'user_id',
                unique: true,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(20),
                field: 'first_name'
            },
            middleName: {
                type: Sequelize.STRING(20),
                field: 'middle_name'
            },
            lastName: {
                type: Sequelize.STRING(20),
                field: 'last_name'
            },
            fullName: {
                type: Sequelize.STRING(60),
                field: 'full_name'
            },
            emailId: {
                type: Sequelize.STRING(50),
                field: 'email_id'
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_user');
    }
};