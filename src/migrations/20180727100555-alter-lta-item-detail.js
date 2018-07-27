'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'followUpDate',
            {
                type: Sequelize.DATEONLY,
                field: 'follow_up_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'followUpDate',
            {
                type: Sequelize.DATE,
                field: 'follow_up_date'
            }
        );
    }
};
