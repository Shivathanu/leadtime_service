'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_bom_detail',
            'contact_user_id'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_bom_detail',
            'contact_user_id',
            {
                type: Sequelize.STRING(10),
                field: 'contact_user_id'
            }
        );
    }
};
