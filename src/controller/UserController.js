var express = require('express');
var UserController = express.Router();
var userService = require('../service/UserService');
var logger = require('../../config/log');

/**
 * Controller to match router "/api/user/all"
 * 
 * @param {Object} request
 * @param {Object} response
 */
UserController.get('/all', function(request, response) {
    userService.getAllUsers(function(getError, users) {
        if (getError) {
            logger.error('Error while getting all users', {
                error: getError,
                params: request.params
            });
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
UserController.post('/save', function(request, response) {
    userService.saveUser(request.body, function(createError, user) {
        if (createError) {
            logger.error('Error while creating a user', {
                error: createError,
                params: request.body
            });
            response.status(500).send(createError);
        }
        response.send(user);
    });
});

module.exports = UserController;
