'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_bom_detail',
            'bom_name',
            {
                type: Sequelize.STRING(999),
                field: 'bom_name'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_bom_detail',
            'bom_name'
        );
    }
};
