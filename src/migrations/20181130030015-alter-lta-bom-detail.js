'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_bom_detail',
            'project_manager',
            {
                type: Sequelize.STRING(60),
                field: 'project_manager'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_bom_detail',
            'project_manager'
        );
    }
};
