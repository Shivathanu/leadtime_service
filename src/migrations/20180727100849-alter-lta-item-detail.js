'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'shipDate',
            {
                type: Sequelize.DATEONLY,
                field: 'ship_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'shipDate',
            {
                type: Sequelize.DATE,
                field: 'ship_date'
            }
        );
    }
};
