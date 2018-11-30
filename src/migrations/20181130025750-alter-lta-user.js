'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_user',
            'employee_id',
            {
                type: Sequelize.STRING(15),
                field: 'employee_id'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_user',
            'employee_id'
        );
    }
};
