var express = require('express');
var ItemDetailController = express.Router();
var itemDetailService = require('../service/ItemDetailService');
var logger = require('../../config/log');

/**
 * Controller to match router "/api/item-detail/follow-up"
 * 
 * @param {Object} request
 * @param {Object} response
 */
ItemDetailController.get('/follow-up/:duration/:type/:itemId/:bomId', function(request, response) {
    itemDetailService.getHoldItems(request.params, function(getError, itemDetails) {
        if (getError) {
            logger.error('Error while getting Hold Item Details', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(itemDetails);
    });
});

module.exports = ItemDetailController;
