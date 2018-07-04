'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('lta_last_process_date', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            jobName: {
                type: Sequelize.STRING(30),
                field: 'job_name',
                allowNull: false
            },
            lastProcessTime: {
                type: Sequelize.DATE,
                field: 'last_process_time'
            },
            status: {
                type: Sequelize.STRING(20),
                field: 'job_status'
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('lta_last_process_date');
    }
};