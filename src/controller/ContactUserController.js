var express = require('express');
var ContactUserController = express.Router();
var contactUserService = require('../service/ContactUserService');
var logger = require('../../config/log');

/**
 * Controller method to create new contact user
 * 
 * @param {Object} request
 * @param {Object} response
 */
ContactUserController.post('/create', function(request, response) {
    contactUserService.create(request.body, function(createError, contactUser) {
        if(createError) {
            logger.error('Error occured while creating new contact user', {
                error: createError,
                params: request.body
            });
            response.status(500).send(createError);
        }
        response.send(contactUser);
    });
});

/**
 * Controller method to retrieve all contact user
 * 
 * @param {Object} request
 * @param {Object} response
 */
ContactUserController.get('/all', function(request, response) {
    contactUserService.getContactUserList(function(getError, userList) {
        if(getError) {
            logger.error('Error occured while getting contact users list', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(userList);
    });
});

module.exports = ContactUserController;