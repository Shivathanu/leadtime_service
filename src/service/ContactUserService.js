var contactUserDao = require('../dao/ContactUserDao');
var ContactUserService = {};

/**
 * Service to create new contact user
 * 
 * @param {Object} reqParam
 * @param {Function} createCB
 */
ContactUserService.create = function(reqParam, createCB) {
    contactUserDao.create(reqParam, function(createError, response) {
        if(createError) {
            return createCB(createError);
        }
        return createCB(null, response);
    });
};

/**
 * Service to retrieve new contact user
 * 
 * @param {Function} getContactUserListCB
 */
ContactUserService.getContactUserList = function(getContactUserListCB) {
    contactUserDao.getContactUserList(function(getError, userList) {
        if(getError) {
            return getContactUserListCB(getError);
        }
        return getContactUserListCB(null, userList);
    });
};

module.exports = ContactUserService;
