var async = require('async');
var _ = require('lodash');
var bomDetailDao = require('../dao/BomDetailDao');
var itemDetailService = require('../service/itemDetailService');
var contactUserService = require('../service/ContactUserService');
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
            count: itemDetailService.getLineItemCount.bind(null, bomDetail.bomId, 'all')
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
BomDetailService.getFollowUpBomDetails = function(reqParams, getBomsCB) {
    async.waterfall([
        async.apply(itemDetailService.getFollowUpBomDetails, reqParams),
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
 * @param {Function} countCB 
 */
var getFollowUpCount = function(bomList, countCB) {
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
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
BomDetailService.getCompletedBomDetails = function(reqParams, getBomsCB) {
    async.waterfall([
        async.apply(itemDetailService.getCompletedBomDetails, reqParams),
        getBomDetailsById,
        getFollowUpCount
    ], function(waterFallError, result) {
        if(waterFallError) {
            return getBomsCB(waterFallError);
        }
        return getBomsCB(null, result);
    });
};

/**
 * Private method to get Both Bom Details and Item Info
 * based on BomID
 * 
 * @param {String} bomId 
 * @param {String} type 
 * @param {Function} getDetailsCB 
 */
var getBomDetailsAndItemInfo = function(bomId, type, getDetailsCB) {
    async.parallel({
        bomDetails: bomDetailDao.getBomDetailsById.bind(null, bomId),
        totalCount: itemDetailService.getLineItemCount.bind(null, bomId, 'all'),
        followUpCount: itemDetailService.getLineItemCount.bind(null, bomId, 'hold'),
        lastFollowUpDate: itemDetailService.getLastFollowUpDate.bind(null, bomId)
    }, function(parallelErr, result) {
        if (parallelErr) {
            return getDetailsCB(parallelErr);
        }
        var bomDetails = result.bomDetails.dataValues;
        bomDetails.totalLineItems = result.totalCount;
        bomDetails.followUpCount = result.followUpCount;
        bomDetails.lastFollowUpDate = result.lastFollowUpDate.followUpDate;
        return getDetailsCB(null, bomDetails);
    });
};

/**
 * Service to get bom and corresponding line-items using bomid
 * 
 * @param {Object} reqParams
 * @param {Function} getBomCB
 */
BomDetailService.getBomInfoById = function(reqParams, getBomCB) {
    var bomDetails;
    async.waterfall([
        async.apply(getBomDetailsAndItemInfo, reqParams.bomId, reqParams.type),
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
