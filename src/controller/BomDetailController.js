var express = require('express');
var BomDetailController = express.Router();
var bomDetailService = require('../service/BomDetailService');
var logger = require('../../config/log');

/**
 * Controller method to get all follow-up bom details
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/all/:status', function(request, response) {
    bomDetailService.getAllBomDetails(request.params, function(getError, bomDetailList) {
        if(getError) {
            logger.error('Error occured while getting all follow-up bom details', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(bomDetailList);
    });
});

/**
 * Controller method to get all completed bom details
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/limit/:status/:pageIndex', function(request, response) {
    bomDetailService.getBomDetailsByPage(request.params, function(getError, bomDetailList) {
        if(getError) {
            logger.error('Error occured while getting all completed bom details', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(bomDetailList);
    });
});

/**
 * Controller method to get bom and corresponding line items by bomId
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/bom-info/:bomId', function(request, response) {
    bomDetailService.getBomInfoById(request.params, function(getError, bom) {
        if(getError) {
            logger.error('Error while getting bom by id', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(bom);
    });
});

module.exports = BomDetailController;
