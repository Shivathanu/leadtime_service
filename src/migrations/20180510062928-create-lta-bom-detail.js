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
                field: 'customer_purchase_number',
                allowNull: false
            },
            endUserId: {
                type: Sequelize.STRING(30),
                field: 'end_user_id',
                allowNull: true
            },  
            endUserName: {
                type: Sequelize.STRING(80),
                field: 'end_user_name',
                allowNull: true
            },
            status: {
                type: Sequelize.STRING(10),
                field: 'status',
                allowNull: false
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