'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_end_user', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false        
            },
            endUserId: {
                type: Sequelize.STRING,
                unique: true,
                field: 'end_user_id',
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                field: 'name',
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                field: 'address',
                allowNull: false
            },
            city: {
                type: Sequelize.STRING,
                field: 'city',
                allowNull: false
            },
            zip: {
                type: Sequelize.STRING,
                field: 'zip',
                allowNull: false
            },
            state: {
                type: Sequelize.STRING,
                field: 'state',
                allowNull: false
            },
            country: {
                type: Sequelize.STRING,
                field: 'country',
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                field: 'type'
            },
            emailId: {
                type: Sequelize.STRING,
                field: 'email_id',
                allowNull: false
            },
            homePhoneNumber: {
                type: Sequelize.STRING,
                field: 'contact_home',
            },
            mobileNumber: {
                type: Sequelize.STRING,
                field: 'contact_mobile',
                allowNull: false
            },
            officePhoneNumber: {
                type: Sequelize.STRING,
                field: 'contact_office'
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
        return queryInterface.dropTable('lta_end_user');
    }
};