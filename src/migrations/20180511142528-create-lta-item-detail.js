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
                type: Sequelize.STRING(30),
                field: 'bom_id',
                allowNull: false
            },
            itemId: {
                type: Sequelize.STRING(6),
                field: 'item_id',
                allowNull: false
            },
            productId: {
                type: Sequelize.STRING(50),
                field: 'product_id',
                allowNull: false
            },
            productName: {
                type: Sequelize.STRING(50),
                field: 'product_name',
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(50),
                field: 'description'
            },
            designation: {
                type: Sequelize.STRING(50),
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
                allowNull: true
            },
            prevLeadTime: {
                type: Sequelize.INTEGER,
                field: 'previous_lead_time',
                allowNull: true
            },
            currentLeadTime: {
                type: Sequelize.INTEGER,
                field: 'current_lead_time',
                allowNull: false
            },
            releaseDate: {
                type: Sequelize.DATE,
                field: 'release_date',
                allowNull: true
            },            
            followUpDate: {
                type: Sequelize.DATE,
                field: 'follow_up_date',
                allowNull: true
            },
            shippingAddress: {
                type: Sequelize.TEXT,
                field: 'shipping_address_detail',
                allowNull: true
            },
            status: {
                type: Sequelize.STRING(20),
                field: 'status',
                allowNull: false
            },
            itemCreatedAt: {
                type: Sequelize.DATE,
                field: 'src_created_at',
                allowNull: false
            },
            shipDate: {
                type: Sequelize.DATE,
                field: 'ship_date',
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_item_detail');
    }
};