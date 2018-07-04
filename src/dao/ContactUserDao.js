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
    }, function(error) {
        return createCB(error);
    });
};

/**
 * Dao method to get all contact user list
 * 
 * @param {Funtion} getContactUserListCB
 */
ContactUserDao.getContactUserList = function(getContactUserListCB) {
    Models.ContactUser.findAll().then(function(contactUserList) {
        return getContactUserListCB(null, contactUserList);
    }, function(error) {
        return getContactUserListCB(error);
    }); 
};

module.exports = ContactUserDao;
