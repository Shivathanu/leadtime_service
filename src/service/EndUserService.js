var endUserDao = require('../dao/EndUserDao');
var EndUserService = {};

/**
 * Service to create new end user
 * 
 * @param {Object} reqParam
 * @param {Function} createCB
 */
EndUserService.create = function(reqParam, createCB) {
    endUserDao.create(reqParam, function(createError, response) {
        if(createError) {
            return createCB(createError);
        }
        return createCB(null, response);
    });
};

/**
 * Service to retrieve new end user
 * 
 * @param {Function} getEndUserListCB
 */
EndUserService.getEndUserList = function(getEndUserListCB) {
    endUserDao.getEndUserList(function(getError, userList) {
        if(getError) {
            return getEndUserListCB(getError);
        }
        return getEndUserListCB(null, userList);
    });
};

module.exports = EndUserService;
