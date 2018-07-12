var userDao = require('../dao/UserDao');
var UserService = {};

/**
 * Method to get all users
 * 
 * @param {Function} getUsersCB
 */
UserService.getAllUsers = function(getUsersCB) {
    userDao.findAllUsers(function(findError, users) {
        if (findError) {
            return getUsersCB(findError);
        }
        return getUsersCB(null, users);
    });
};

module.exports = UserService;