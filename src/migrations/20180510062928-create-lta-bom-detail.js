'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_bom_detail', {
            id: {
                type: Sequelize.INTEGER,        
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            bomId: {
                type: Sequelize.STRING(30),
                unique: true,
                allowNull: false,
                field: 'bom_id'
            },
            createdBy: {
                type: Sequelize.STRING(50),
                allowNull: false,
                field: 'created_by'
            },
            createdByName: {
                type: Sequelize.STRING(200),
                allowNull: false,
                field: 'created_by_name'
            },
            bomCreatedDate: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'bom_created_date'
            },
            soldToAcc: {
                type: Sequelize.STRING(10),
                field: 'sold_to_acc'
            },
            soldToAccName: {
                type: Sequelize.STRING(135),
                field: 'sold_to_acc_name',
                allowNull: false
            },
            orderNumber: {
                type: Sequelize.STRING,
                field: 'order_number',
                allowNull: false
            },
            customerPOId: {
                type: Sequelize.STRING,
                field: 'customer_purchase_number'
            },
            contactUserId: {
                type: Sequelize.STRING(50),
                field: 'contact_user_id'
            },  
            contactUserName: {
                type: Sequelize.STRING(80),
                field: 'contact_user_name'
            },
            status: {
                type: Sequelize.STRING(10),
                field: 'status'
            },
            bomUpdatedDate: {
                type: Sequelize.DATE,
                field: 'bom_updated_date'
            },
            bomCreatedAt: {
                type: Sequelize.DATE,
                field: 'src_created_at'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'created_at'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_bom_detail');
    }
};