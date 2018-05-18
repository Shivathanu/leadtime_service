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
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                field: 'bom_id'
            },
            createdBy: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'created_by',
                references: {
                    model: {
                        tableName: 'lta_user',
                    },
                    key: 'user_id'
                }
            },
            createdByName: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'created_by_name'
            },
            bomCreatedDate: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'bom_created_date'
            },
            soldToAcc: {
                type: Sequelize.STRING,
                field: 'sold_to_acc'
            },
            soldToAccName: {
                type: Sequelize.STRING,
                field: 'sold_to_acc_name',
                allowNull: false
            },
            orderNumber: {
                type: Sequelize.STRING(35),
                field: 'order_number',
                allowNull: false
            },
            customerPOId: {
                type: Sequelize.STRING(35),
                field: 'customer_purchase_number',
                allowNull: false
            },
            endUserName: {
                type: Sequelize.STRING(80),
                field: 'end_user_name',
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_bom_detail');
    }
};