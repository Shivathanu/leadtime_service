'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.renameColumn(
            'lta_mail',
            'contact_user_mail_id',
            'receiver_id'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.renameColumn(
            'lta_mail',
            'receiver_id',
            'contact_user_mail_id'
        );
    }
};
