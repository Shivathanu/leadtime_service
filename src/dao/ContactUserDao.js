var Models = require('../models/index');
var ContactUserDao = {};

/**
 * Dao method to get contact user by Id
 * 
 * @param {String} contactUserId
 * @param {Function} getUserCB
 */
ContactUserDao.getContactUser = function(contactUserId, getUserCB) {
    Models.ContactUser.find({
        where: {
            contactUserId: contactUserId
        }
    }).then(function(contactUser) {
        return getUserCB(null, contactUser);
    }, function(getError) {
        return getUserCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = ContactUserDao;
