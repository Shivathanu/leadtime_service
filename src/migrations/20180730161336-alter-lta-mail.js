'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_mail',
            'content'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_mail',
            'content',
            {
                type: Sequelize.TEXT,
                field: 'content',
                allowNull: false
            }
        );
    }
};
