var userDao = require('../dao/UserDao');
var UserService = {};

/**
 * Method to get user name
 * 
 * @param {Function} getNameCB
 */
UserService.getUserName = function(userId, getNameCB) {
    userDao.findUserName(userId, function(findError, user) {
        if (findError) {
            return getNameCB(findError);
        }
        user.dataValues.userName = user.dataValues.firstName + '.' +
            user.dataValues.lastName;
        return getNameCB(null, user);
    });
};

module.exports = UserService;