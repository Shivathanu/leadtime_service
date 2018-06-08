'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_note', {
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
            bomId: {
                type: Sequelize.STRING(30),
                field: 'bom_id',
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                field: 'content'
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_note');
    }
};