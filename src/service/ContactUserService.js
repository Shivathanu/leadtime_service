var contactUserDao = require('../dao/ContactUserDao');
var ContactUserService = {};

/**
 * Service to get contact user details by Id
 * 
 * @param {String} contactUserId
 * @param {Function} getUserCB
 */
ContactUserService.getContactUserById = function(contactUserId, getUserCB) {
    contactUserDao.getContactUser(contactUserId, function(getError, contactUser) {
        if(getError) {
            return getUserCB(getError);
        }
        return getUserCB(null, contactUser);
    });
};

module.exports = ContactUserService;
