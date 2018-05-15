var bomDetailDao = require('../dao/BomDetailDao');
var _ = require('lodash');
var async = require('async');
var BomDetailService = {};



/**
 * Private method to separate bom list to today and other list
 * 
 * @param {Object} bomDetailList 
 * @param {Function} separateBomCB 
 */
var separateBom = function(bomDetailList, separateBomCB) {
    var today = new Date();
    var groupedLineItems = _.map(bomDetailList, function(bom) {
        if(_.some(bom.ItemDetails, function(lineItem) { 
            return new Date(lineItem.followUpDate) <= today;
        })) {
            return _.extend(bom, {'groupType': 'today'});
        }
        return _.extend(bom, {'groupType': 'other'});
    });
    return separateBomCB(null, _.assignIn({today: [], other: []}, 
        _.groupBy(groupedLineItems, 'groupType')));
};


/**
 * Service to create new bom
 * 
 * @param { Object } reqParam
 * @param {Function} creatBomCB
 */
BomDetailService.createBom = function(reqParam, creatBomCB) {
    bomDetailDao.createBom(reqParam, function(createError, createdBom) {
        if(createError) {
            return creatBomCB(createError);
        }
        return creatBomCB(null, createdBom);
    });
};

/**
 * Service to get all bom details
 * 
 * @param {Object} reqParam
 * @param {Function} getPageCountCB
 */
BomDetailService.getPageCount = function(reqParam, getPageCountCB) {
    bomDetailDao.getPageCount(reqParam, function(getError, pageCount) {
        if(getError) {
            return getPageCountCB(getError);
        }
        return getPageCountCB(null, pageCount);
    });
};


/**
 * Service to get all bom details
 * 
 * @param {Object} reqParam
 * @param {Function} getAllBomDetailCB
 */
BomDetailService.getAllBomDetail = function(reqParam, getAllBomDetailCB) {
    async.waterfall([
        async.apply(bomDetailDao.getAllBomDetail, reqParam),
        separateBom
    ], function(waterFallError, result) {
        if(waterFallError) {
            return getAllBomDetailCB(waterFallError);
        }
        return getAllBomDetailCB(null, result);
    });
};



module.exports = BomDetailService;
