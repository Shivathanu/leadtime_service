'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_transaction_log', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
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
            itemId: {
                type: Sequelize.STRING(6),
                field: 'item_id',
                allowNull: false
            },
            holdDate: {
                type: Sequelize.DATE,
                field: 'hold_date',
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                field: 'address'
            },
            releaseConfirmDate: {
                type: Sequelize.DATE,
                field: 'release_confirm_date'
            },
            followUpDate: {
                type: Sequelize.DATE,
                field: 'follow_up_date'
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
                allowNull: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_transaction_log');
    }
};