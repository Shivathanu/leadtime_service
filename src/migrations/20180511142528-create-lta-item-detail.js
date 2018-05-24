'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_item_detail', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            itemId: {
                type: Sequelize.STRING,
                field: 'item_id',
                allowNull: false
            },
            productId: {
                type: Sequelize.STRING,
                field: 'product_id',
                allowNull: false,
            },
            productName: {
                type: Sequelize.STRING,
                field: 'product_name',
                allowNull: false
            },
            quantity: {
                type: Sequelize.INTEGER,
                field: 'quantity',
                allowNull: false
            },
            followUpDate: {
                type: Sequelize.DATE,
                field: 'follow_up_date',
                allowNull: false
            },
            leadTime: {
                type: Sequelize.INTEGER,
                field: 'lead_time',
                allowNull: false
            },
            scheduledDate: {
                type: Sequelize.DATE,
                field: 'scheduled_request_date',
                allowNull: false
            },
            bomId: {
                type: Sequelize.STRING,
                field: 'bom_id',
                allowNull: false,
                references: {
                    model: {
                        tableName: 'lta_bom_detail',
                    },
                    key: 'bom_id'
                }
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_item_detail');
    }
};