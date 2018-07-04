var express = require('express');
var ContactUserController = express.Router();
var contactUserService = require('../service/ContactUserService');

/**
 * Controller method to create new contact user
 * 
 * @param {Object} request
 * @param {Object} response
 */
ContactUserController.post('/create', function(request, response) {
    contactUserService.create(request.body, function(createError, contactUser) {
        if(createError) {
            console.log('Error occured while creating new contact user', createError);
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
            console.log('Error occured while getting contact users list', getError);
            response.status(500).send(getError);
        }
        response.send(userList);
    });
});

module.exports = ContactUserController;