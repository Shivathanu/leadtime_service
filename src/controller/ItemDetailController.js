var express = require('express');
var ItemDetailController = express.Router();
var itemDetailService = require('../service/ItemDetailService');
var logger = require('../../config/log');

/**
 * Controller method to create new line item.
 * 
 * @param {Object} request
 * @param {Object} response
 */
ItemDetailController.post('/create', function(request, response){
    itemDetailService.createdLineItem(request.body, function(createError, itemDetail){
        if(createError) {
            logger.error('Error occured while creating new bom', {
                error: createError,
                params: request.body
            });
            response.status(500).send(createError);
        }
        response.send(itemDetail); 
    }); 
});

/**
 * Controller to get all line items by bomId
 * 
 * @param {Object} request,
 * @param {Object} response
 */
ItemDetailController.get('/all/:bomId', function(request, response){
    itemDetailService.getLineItemByBomId(request.params, function(getError, itemDetail){
        if(getError) {
            logger.error('Error while getting line item details by bom id', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(itemDetail);
    }); 
});

module.exports = ItemDetailController;