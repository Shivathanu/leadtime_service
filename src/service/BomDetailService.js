var async = require('async');
var _ = require('lodash');
var bomDetailDao = require('../dao/BomDetailDao');
var itemDetailService = require('../service/itemDetailService');
var contactUserService = require('../service/ContactUserService');
var constant = require('../util/Constant.js');
var BomDetailService = {};

/**
 * Private method to separate bom list to today and other list
 * 
 * @param {String} status
 * @param {Array} bomDetailList 
 * @param {Function} separateCB
 */
var separateBomsToFollowUp = function(status, bomDetailList, separateCB) {
    if(status === constant.COMPLETEDSTATUS) {
        return separateCB(null, bomDetailList);
    }
    var today = new Date();
    var groupedLineItems = _.map(bomDetailList, function(bom) {
        if(new Date(bom.followUpDate) <= today) {
            return _.extend(bom, {'groupType': 'today'});
        }
        return _.extend(bom, {'groupType': 'other'});
    });
    return separateCB(null, _.assignIn({today: [], other: []}, 
        _.groupBy(groupedLineItems, 'groupType')));
};

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
 * Service to get all bom details by status
 * 
 * @param {Object} reqParam
 * @param {Function} getAllBomDetailCB
 */
BomDetailService.getBomDetailsByStatus = function(reqParam, getAllBomDetailCB) {
    async.waterfall([
        async.apply(itemDetailService.getBomsByDate, reqParam),
        getBomDetailsById,
        function(result, passParamsCB) {
            return passParamsCB(null, reqParam.status, result);
        },
        separateBomsToFollowUp
    ], function(waterFallError, result) {
        if(waterFallError) {
            return getAllBomDetailCB(waterFallError);
        }
        return getAllBomDetailCB(null, result);
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
BomDetailService.getBomById = function(reqParam, getBomCB) {
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
