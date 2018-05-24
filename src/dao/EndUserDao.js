var Models = require('../models/index');
var EndUserDao = {};

/**
 * Dao method to create new user
 * 
 * @param {Object} reqParam
 * @param {Function} createCB
 */
EndUserDao.create = function(reqParam, createCB) {
    Models.EndUser.create(reqParam).then(function(createdUser) {
        return createCB(null, createdUser);
    }, function(error) {
        return createCB(error);
    });
};

/**
 * Dao method to get all end user list
 * 
 * @param {Funtion} getEndUserListCB
 */
EndUserDao.getEndUserList = function(getEndUserListCB) {
    Models.EndUser.findAll().then(function(endUserList) {
        return getEndUserListCB(null, endUserList);
    }, function(error) {
        return getEndUserListCB(error);
    }); 
};

module.exports = EndUserDao;
