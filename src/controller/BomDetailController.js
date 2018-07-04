var express = require('express');
var BomDetailController = express.Router();
var bomDetailService = require('../service/BomDetailService');
var logger = require('../../config/log');

/**
 * Controller method to create new bom.
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.post('/create', function(request, response) {
    bomDetailService.createBom(request.body, function(createError, createdBom) {
        if(createError) {
            logger.error('Error occured while creating new bom', {
                error: createError,
                params: request.body
            });
            response.status(500).send(createError);
        }
        response.send(createdBom); 
    });
});

/**
 * Controller to get total page count
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/count', function(request, response){
    bomDetailService.getPageCount(request.body, function (getError, pageCount) {
        if(getError) {
            logger.error('Error occured while getting bom details page count', {
                error: getError,
                params: request.params
            });
            response.status(500).send(getError);
        }
        response.send(pageCount);
    });
});

/**
 * Controller method to get all bom details
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/all/:status/:pageIndex', function(request, response) {
    bomDetailService.getAllBomDetail(request.params, function(getError, bomDetailList) {
        if(getError) {
            logger.error('Error occured while getting all bom details', {
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
    bomDetailService.getBomById(request.params, function(getError, bom) {
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
