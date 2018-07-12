var Models = require('../models/index');
var UserDao = {};

/**
 * Method to find all users
 * 
 * @param {Function} findUsersCB
 */
UserDao.findAllUsers = function(findUsersCB) {
    Models.User.findAll().then(function(users) {
        return findUsersCB(null, users);
    }, function(findError) {
        return findUsersCB({
            error: findError.name,
            message: findError.parent.message
        });
    });
};

module.exports = UserDao;
