var express = require('express');
var BomDetailController = express.Router();
var bomDetailService = require('../service/BomDetailService');

/**
 * Controller method to create new bom.
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.post('/create', function(request, response) {
    bomDetailService.createBom(request.body, function(createError, createdBom) {
        if(createError) {
            console.log('Error occured while creating new bom, Actual Error:',createError);
            response.status(200).send(createError);
        }
        response.send(createdBom); 
    });
});

/**
 * Controller method to get all bom details
 * 
 * @param {Object} request
 * @param {Object} response
 */
BomDetailController.get('/all', function(request, response) {
    bomDetailService.getAllBomDetail(function(getError, bomDetailList) {
        if(getError) {
            console.log('Error occured while getting all bom details', getError);
            response.status(200).send(getError);
        }
        response.send(bomDetailList);
    });
});


module.exports = BomDetailController;