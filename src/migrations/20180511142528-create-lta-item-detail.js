'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_item_detail', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
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
                field: 'product_id'
            },
            productName: {
                type: Sequelize.STRING(50),
                field: 'product_name'
            },
            description: {
                type: Sequelize.STRING(100),
                field: 'description'
            },
            designation: {
                type: Sequelize.STRING(100),
                field: 'designation'
            },
            quantity: {
                type: Sequelize.INTEGER,
                field: 'quantity'
            },
            holdDate: {
                type: Sequelize.DATE,
                field: 'hold_date'
            },
            prevLeadTime: {
                type: Sequelize.INTEGER,
                field: 'previous_lead_time'
            },
            currentLeadTime: {
                type: Sequelize.INTEGER,
                field: 'current_lead_time',
                allowNull: false
            },
            releaseDate: {
                type: Sequelize.DATE,
                field: 'release_date'
            },            
            followUpDate: {
                type: Sequelize.DATE,
                field: 'follow_up_date'
            },
            shippingAddress: {
                type: Sequelize.TEXT,
                field: 'shipping_address_detail'
            },
            status: {
                type: Sequelize.STRING(10),
                field: 'status'
            },
            itemCreatedAt: {
                type: Sequelize.DATE,
                field: 'src_created_at'
            },
            shipDate: {
                type: Sequelize.DATE,
                field: 'ship_date'
            },
            bomUpdatedDate: {
                type: Sequelize.DATE,
                field: 'bom_updated_date'
            },
            parentId: {
                type: Sequelize.STRING(6),
                field: 'parent_id'
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