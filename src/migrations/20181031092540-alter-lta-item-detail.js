'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_item_detail',
            'is_deliverable',
            {
                type: Sequelize.BOOLEAN,
                field: 'is_deliverable'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_item_detail',
            'is_deliverable'
        );
    }
};
