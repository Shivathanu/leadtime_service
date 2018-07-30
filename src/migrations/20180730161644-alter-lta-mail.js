'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'lta_mail',
            'user_mail_id'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'lta_mail',
            'user_mail_id',
            {
                type: Sequelize.STRING(50),
                field: 'user_mail_id',
                allowNull: false
            }
        );
    }
};
