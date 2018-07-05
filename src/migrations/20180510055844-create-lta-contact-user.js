'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_contact_user', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            contactUserId: {
                type: Sequelize.STRING(50),
                unique: true,
                field: 'contact_user_id',
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(80),
                field: 'name'
            },
            address: {
                type: Sequelize.TEXT,
                field: 'address'
            },
            city: {
                type: Sequelize.STRING(40),
                field: 'city'
            },
            zip: {
                type: Sequelize.STRING(10),
                field: 'zip'
            },
            state: {
                type: Sequelize.STRING(3),
                field: 'state'
            },
            country: {
                type: Sequelize.STRING(3),
                field: 'country'
            },
            type: {
                type: Sequelize.STRING(20),
                field: 'type'
            },
            emailId: {
                type: Sequelize.STRING(241),
                field: 'email_id'
            },
            homePhoneNumber: {
                type: Sequelize.STRING(30),
                field: 'contact_home'
            },
            mobileNumber: {
                type: Sequelize.STRING(30),
                field: 'contact_mobile'
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
        return queryInterface.dropTable('lta_contact_user');
    }
};