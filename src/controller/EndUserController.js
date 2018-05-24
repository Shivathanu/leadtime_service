var express = require('express');
var EndUserController = express.Router();
var endUserService = require('../service/EndUserService');

/**
 * Controller method to create new end user
 * 
 * @param {Object} request
 * @param {Object} response
 */
EndUserController.post('/create', function(request, response) {
    endUserService.create(request.body, function(createError, endUser) {
        if(createError) {
            console.log('Error occured while creating new end user', createError);
            response.status(500).send(createError);
        }
        response.send(endUser);
    });
});

/**
 * Controller method to retrieve all end user
 * 
 * @param {Object} request
 * @param {Object} response
 */
EndUserController.get('/all', function(request, response) {
    endUserService.getEndUserList(function(getError, userList) {
        if(getError) {
            console.log('Error occured while getting end users list', getError);
            response.status(500).send(getError);
        }
        response.send(userList);
    });
});

module.exports = EndUserController;