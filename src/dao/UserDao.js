var Models = require('../models/index');
var UserDao = {};

/**
 * Method to find user name based on userid
 * 
 * @param {Function} findNameCB
 */
UserDao.findUserName = function(userId, findNameCB) {
    Models.User.find({
        attributes: ['firstName', 'middleName', 'lastName'],
        where: {
            userId: userId
        }
    }).then(function(users) {
        return findNameCB(null, users);
    }, function(findError) {
        return findNameCB({
            error: findError.name,
            message: findError.parent.message
        });
    });
};

module.exports = UserDao;
