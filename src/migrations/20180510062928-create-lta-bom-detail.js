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
                field: 'created_by'
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_bom_detail');
    }
};