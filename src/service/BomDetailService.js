var async = require('async');
var _ = require('lodash');
var bomDetailDao = require('../dao/BomDetailDao');
var itemDetailService = require('../service/itemDetailService');
var contactUserService = require('../service/ContactUserService');
var constant = require('../util/Constant.js');
var BomDetailService = {};

/**
 * Private method to get details for all boms
 * 
 * @param {Array} bomList 
 * @param {Function} getDetailsCB 
 */
var getBomDetailsById = function(bomList, getDetailsCB) {
    async.map(bomList, function(bomDetail, asyncCB) {
        async.parallel({
            details: bomDetailDao.getBomInfoById.bind(null, bomDetail.bomId),
            count: itemDetailService.getLineItemCount.bind(null, bomDetail.bomId)
        }, function(parallelErr, result) {
            if (parallelErr) {
                return asyncCB(parallelErr);
            }
            if (!result.details) {
                return asyncCB(null, _.extend(bomDetail.dataValues, {
                    totalLineItems: result.count
                }));
            }
            return asyncCB(null, _.extend(bomDetail.dataValues,
                result.details.dataValues, {
                    totalLineItems: result.count
                })
            );
        });
    }, function(mapError, result) {
        if (mapError) {
            return getDetailsCB(mapError);
        }
        return getDetailsCB(null, result);
    });
};

/**
 * Service to get follow-up bom details
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
BomDetailService.getAllBomDetails = function(reqParams, getBomsCB) {
    async.waterfall([
        async.apply(itemDetailService.getAllBomDetails, reqParams),
        getBomDetailsById
    ], function(waterFallError, result) {
        if(waterFallError) {
            return getBomsCB(waterFallError);
        }
        return getBomsCB(null, result);
    });
};

/**
 * Private method to calculate follow up count
 * 
 * @param {Array} bomList 
 * @param {String} status 
 * @param {Function} countCB 
 */
var getFollowUpCount = function(bomList, status, countCB) {
    if (status !== constant.COMPLETEDSTATUS) {
        return countCB(null, bomList);
    }
    var result = _.map(bomList, function(bomDetail) {
        return _.extend(bomDetail, {
            followUpCount: bomDetail.totalLineItems - bomDetail.releaseCount
        });
    });
    return countCB(null, result);
};

/**
 * Service to get released bom details
 * 
 * @param {Object} reqParam
 * @param {Function} getBomsCB
 */
BomDetailService.getBomDetailsByPage = function(reqParam, getBomsCB) {
    async.waterfall([
        async.apply(itemDetailService.getBomDetailsByPage, reqParam),
        getBomDetailsById,
        function(result, passParamsCB) {
            return passParamsCB(null, result, reqParam.status);
        },
        getFollowUpCount
    ], function(waterFallError, result) {
        if(waterFallError) {
            return getBomsCB(waterFallError);
        }
        return getBomsCB(null, result);
    });
};

/**
 * Private method to get Both Bom and Item details
 * based on BomID
 * 
 * @param {String} bomId 
 * @param {Function} getDetailsCB 
 */
var getBomAndItemDetails = function(bomId, getDetailsCB) {
    async.parallel({
        bomDetails: bomDetailDao.getBomDetailsById.bind(null, bomId),
        itemDetails: itemDetailService.getHoldItemsByBomId.bind(null, bomId)
    }, function(parallelErr, result) {
        if (parallelErr) {
            return getDetailsCB(parallelErr);
        }
        var today = new Date();
        var bomDetails = result.bomDetails.dataValues;
        bomDetails.totalLineItems = result.itemDetails.length;
        bomDetails.followUpCount = _.filter(result.itemDetails, function(lineItem) {
            return (new Date(lineItem.dataValues.followUpDate) <= today);
        }).length;
        bomDetails.itemDetails = result.itemDetails;
        return getDetailsCB(null, bomDetails);
    });
};

/**
 * Service to get bom and corresponding line-items using bomid
 * 
 * @param {Object} reqParam
 * @param {Function} getBomCB
 */
BomDetailService.getBomInfoById = function(reqParam, getBomCB) {
    var bomDetails;
    async.waterfall([
        async.apply(getBomAndItemDetails, reqParam.bomId),
        function(bomData, passParamsCB) {
            bomDetails = bomData;
            return passParamsCB(null, bomData.contactUserId);
        },
        contactUserService.getContactUserById,
        function(contactUser, constructCB) {
            bomDetails.contactUser = contactUser;
            return constructCB(null, bomDetails);
        }
    ], function(waterfallErr, result) {
        if (waterfallErr) {
            return getBomCB(waterfallErr);
        }
        return getBomCB(null, result);
    });
};

module.exports = BomDetailService;
