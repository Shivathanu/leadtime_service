'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addIndex(
            'lta_bom_detail',
            {
                name: 'BomId_Index',
                fields: [
                    'bom_id'
                ]
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeIndex(
            'lta_bom_detail',
            'BomId_Index'
        );
    }
};
