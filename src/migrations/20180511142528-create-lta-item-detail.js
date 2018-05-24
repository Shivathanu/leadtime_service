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
            description: {
                type: Sequelize.STRING,
                field: 'descripion'
            },
            designation: {
                type: Sequelize.STRING,
                field: 'designation'
            },
            quantity: {
                type: Sequelize.INTEGER,
                field: 'quantity',
                allowNull: false
            },
            holdDate: {
                type: Sequelize.DATE,
                field: 'hold_date',
                allowNull: false
            },
            prevLeadTime: {
                type: Sequelize.INTEGER,
                field: 'previous_lead_time',
                allowNull: false
            },
            currentLeadTime: {
                type: Sequelize.INTEGER,
                field: 'current_lead_time',
                allowNull: false
            },
            releaseDate: {
                type: Sequelize.DATE,
                field: 'release_date',
                allowNull: false
            },            
            followUpDate: {
                type: Sequelize.DATE,
                field: 'follow_up_date',
                allowNull: false
            },
            shippingAddress: {
                type: Sequelize.TEXT,
                field: 'shipping_address_detail',
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                allowNull: false
            },
            itemCreatedAt: {
                type: Sequelize.DATE,
                field: 'src_created_at',
                allowNull: 'false'
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