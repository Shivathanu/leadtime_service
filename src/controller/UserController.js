var express = require('express');
var UserController = express.Router();
var UserService = require('../service/UserService');

/**
 * Controller to match router "/api/user/all"
 * 
 * @param {Object} request
 * @param {Object} response
 */
UserController.get('/all', function (request, response) {
    UserService.getAllUsers(function (getError, users) {
        if (getError) {
            console.error('Error while getting all users', getError);
            response.status(500).send(getError);
        }
        response.send(users);
    });
});

/**
 * Controller to match router "/api/user/create"
 * 
 * @param {Object} request
 * @param {Object} response
 */
UserController.post('/save', function (request, response) {
    UserService.saveUser(request.body, function (createError, user) {
        if (createError) {
            console.error('Error while creating a user', createError);
            response.status(500).send(createError);
        }
        response.send(user);
    });
});

module.exports = UserController;
