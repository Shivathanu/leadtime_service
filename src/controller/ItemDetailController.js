var express = require('express');
var ItemDetailController = express.Router();
var itemDetailService = require('../service/ItemDetailService');

/**
 * Controller method to create new line item.
 * 
 * @param {Object} request
 * @param {Object} response
 */
ItemDetailController.post('/create', function(request, response){
    itemDetailService.createdLineItem(request.body, function(createError, itemDetail){
        if(createError) {
            console.log('Error occured while creating new bom, Actual Error:',createError);
            response.status(200).send(createError);
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
ItemDetailController.post('/all', function(request, response){
    itemDetailService.getLineItemByBomId(request.body, function(getError, itemDetail){
        if(getError) {
            console.log('Error while getting line item details by bom id');
            response.status(200).send(getError);
        }
        response.send(itemDetail);
    }); 
});

module.exports = ItemDetailController;