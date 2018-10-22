'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_bom_detail',
            'soldToAccName',
            {
                type: Sequelize.STRING(300),
                field: 'sold_to_acc_name'
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'lta_bom_detail',
            'soldToAccName',
            {
                type: Sequelize.STRING(135),
                field: 'sold_to_acc_name'
            }
        );
    }
};
