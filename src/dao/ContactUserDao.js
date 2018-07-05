var Models = require('../models/index');
var ContactUserDao = {};

/**
 * Dao method to create new user
 * 
 * @param {Object} reqParam
 * @param {Function} createCB
 */
ContactUserDao.create = function(reqParam, createCB) {
    Models.ContactUser.create(reqParam).then(function(createdUser) {
        return createCB(null, createdUser);
    }, function(createError) {
        return createCB({
            error: createError.name,
            message: createError.parent.message
        });
    });
};

/**
 * Dao method to get all contact user list
 * 
 * @param {Function} getContactUserListCB
 */
ContactUserDao.getContactUserList = function(getContactUserListCB) {
    Models.ContactUser.findAll().then(function(contactUserList) {
        return getContactUserListCB(null, contactUserList);
    }, function(getError) {
        return getContactUserListCB({
            error: getError.name,
            message: getError.parent.message
        });
    }); 
};

module.exports = ContactUserDao;
