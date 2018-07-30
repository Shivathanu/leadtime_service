'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_bom_detail',
            'contact_user_name'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_bom_detail',
            'contact_user_name',
            {
                type: Sequelize.STRING(90),
                field: 'contact_user_name'
            }
        );
    }
};
