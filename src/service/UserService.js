var UserDao = require('../dao/UserDao');
var UserService = {};

/**
 * Method to get all users
 * 
 * @param {Function} getUsersCB
 */
UserService.getAllUsers = function (getUsersCB) {
    UserDao.findAllUsers(function (findError, users) {
        if (findError) {
            return getUsersCB(findError);
        }
        return getUsersCB(null, users);
    });
};

/**
 * Method to create a user
 * 
 * @param {Object} reqParams
 * @param {Function} createCB
 */
UserService.saveUser = function (reqParams, createCB) {
    UserDao.createUser(reqParams, function (saveError, user) {
        if (saveError) {
            return createCB(saveError);
        }
        return createCB(null, user);
    });
};

module.exports = UserService;