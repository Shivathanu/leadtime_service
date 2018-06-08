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
                type: Sequelize.STRING(50),
                unique: true,
                field: 'end_user_id',
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                field: 'name',
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                field: 'address',
                allowNull: false
            },
            city: {
                type: Sequelize.STRING(40),
                field: 'city',
                allowNull: false
            },
            zip: {
                type: Sequelize.STRING(10),
                field: 'zip',
                allowNull: false
            },
            state: {
                type: Sequelize.STRING(3),
                field: 'state',
                allowNull: false
            },
            country: {
                type: Sequelize.STRING(3),
                field: 'country',
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(20),
                field: 'type'
            },
            emailId: {
                type: Sequelize.STRING(241),
                field: 'email_id',
                allowNull: false
            },
            homePhoneNumber: {
                type: Sequelize.STRING(30),
                field: 'contact_home'
            },
            mobileNumber: {
                type: Sequelize.STRING(30),
                field: 'contact_mobile',
                allowNull: false
            },
            officePhoneNumber: {
                type: Sequelize.STRING(30),
                field: 'contact_work'
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_end_user');
    }
};