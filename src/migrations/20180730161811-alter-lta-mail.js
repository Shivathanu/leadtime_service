'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_mail',
            'message_id',
            {
                type: Sequelize.STRING,
                field: 'message_id',
                allowNull: false
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_mail',
            'message_id'
        );
    }
};
