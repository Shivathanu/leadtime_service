'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_bom_detail',
            'bomCreatedDate',
            {
                type: Sequelize.DATE,
                allowNull: true,
                field: 'bom_created_date'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_bom_detail',
            'bomCreatedDate',
            {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'bom_created_date'
            }
        );
    }
};
