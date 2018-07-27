'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'holdDate',
            {
                type: Sequelize.DATEONLY,
                field: 'hold_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'holdDate',
            {
                type: Sequelize.DATE,
                field: 'hold_date'
            }
        );
    }
};
