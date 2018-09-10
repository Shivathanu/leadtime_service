'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_item_detail',
            'required_release_date',
            {
                type: Sequelize.DATEONLY,
                field: 'required_release_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_item_detail',
            'required_release_date'
        );  
    }
};
