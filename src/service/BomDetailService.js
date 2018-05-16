var bomDetailDao = require('../dao/BomDetailDao');
var _ = require('lodash');
var constant = require('../util/Constant.js');
var async = require('async');
var BomDetailService = {};



/**
 * Private method to separate bom list to today and other list
 * 
 * @param {Object} bomDetailList 
 * @param {Function} separateBomCB 
 */
var separateBom = function(reqParam, bomDetailList, separateBomCB) {
    if(reqParam.status === constant.COMPLETEDSTATUS) {
        return separateBomCB(null, reqParam, bomDetailList);
    } 
    var today = new Date();
    var groupedLineItems = _.map(bomDetailList, function(bom) {
        if(_.some(bom.ItemDetails, function(lineItem) { 
            return new Date(lineItem.followUpDate) <= today;
        })) {           
            return _.extend(bom, {'groupType': 'today'});
        }
        return _.extend(bom, {'groupType': 'other'});
    });
    return separateBomCB(null, reqParam, _.assignIn({today: [], other: []}, 
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
 * Method to count line items of each bom
 * 
 * @param {Object} reqParam 
 * @param {Object} bomDetailList 
 * @param {Function} countLineItem 
 */
var countLineItem = function(reqParam, bomDetailList, countLineItemCB) {
    if(reqParam.status === constant.HOLDSTATUS) {
        var today = new Date();
        _.forEach(bomDetailList.today, function(bom) {
            bom.dataValues.totalLineItems = bom.ItemDetails.length;
            bom.dataValues.lineItemToFollowUp = _.filter(bom.ItemDetails, function(lineItem) {
                return (new Date(lineItem.followUpDate) <= today);
            }).length;
            delete bom.dataValues.ItemDetails;
            // _.omit(bom.dataValues, ['ItemDetails']);
        });
        _.forEach(bomDetailList.other, function(bom) {
            bom.dataValues.totalLineItems = bom.ItemDetails.length;
            bom.dataValues.lineItemToFollowUp = _.filter(bom.ItemDetails, function(lineItem) {
                return (new Date(lineItem.followUpDate) <= 
                    new Date(bom.ItemDetails[0].followUpDate));
            }).length;
            delete bom.dataValues.ItemDetails;
        });
    } else {
        _.forEach(bomDetailList, function(bom) {
            bom.dataValues.totalLineItems = bom.ItemDetails.length;
            delete bom.dataValues.ItemDetails;
        });
    }
    return countLineItemCB(null, bomDetailList);
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
        separateBom,
        countLineItem
    ], function(waterFallError, result) {
            if(waterFallError) {
                return getAllBomDetailCB(waterFallError);
            }
            return getAllBomDetailCB(null, result);
        }
    );
};



module.exports = BomDetailService;
