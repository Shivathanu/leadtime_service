'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_item_detail',
            'order_number',
            {
                type: Sequelize.STRING(10),
                field: 'order_number'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_item_detail',
            'order_number'
        );
    }
};
