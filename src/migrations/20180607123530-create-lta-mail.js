'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_mail', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.STRING(50),
                field: 'user_id',
                allowNull: false
            },
            endUserMailId: {
                type: Sequelize.STRING(50),
                field: 'end_user_mail_id',
                allowNull: false
            },
            userMailId: {
                type: Sequelize.STRING(50),
                field: 'user_mail_id',
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                field: 'content'
            },
            bomId: {
                type: Sequelize.STRING(30),
                field: 'bom_id',
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(10),
                field: 'status',
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_mail');
    }
};