var Models = require('../model/index');
var UserDao = {};

/**
 * Method to find all users
 * 
 * @param {Function} findUsersCB
 */
UserDao.findAllUsers = function (findUsersCB) {
    Models.User.findAll().then(function (users) {
        return findUsersCB(null, users);
    }, function (findError) {
        return findUsersCB(findError);
    });
};

/**
 * Method to create a user
 * 
 * @param {Object} reqParams
 * @param {Function} createUserCB
 */
UserDao.createUser = function (reqParams, createUserCB) {
    Models.User.create(reqParams).then(function (user) {
        return createUserCB(null, user);
    }, function (createError) {
        return createUserCB(createError);
    });
};

module.exports = UserDao;
