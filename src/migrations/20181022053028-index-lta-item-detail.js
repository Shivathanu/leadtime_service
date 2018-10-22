'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addIndex(
            'lta_item_detail',
            {
                name: 'BomId_ItemId_Unique_Index',
                fields: [
                    'bom_id',
                    'item_id'
                ],
                unique: true
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeIndex(
            'lta_item_detail',
            'BomId_ItemId_Unique_Index'
        );
    }
};
