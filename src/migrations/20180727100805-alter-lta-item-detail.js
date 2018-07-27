'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'releaseDate',
            {
                type: Sequelize.DATEONLY,
                field: 'release_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_item_detail',
            'releaseDate',
            {
                type: Sequelize.DATE,
                field: 'release_date'
            }
        );
    }
};
