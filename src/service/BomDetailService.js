var async = require('async');
var _ = require('lodash');
var bomDetailDao = require('../dao/BomDetailDao');
var itemDetailService = require('../service/ItemDetailService');
var noteService = require('../service/NoteService');
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
            count: itemDetailService.getLineItemCount.bind(null, bomDetail.bomId, 'all'),
            lastFollowUp: noteService.getLatestNote.bind(null, bomDetail.bomId)
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
                    totalLineItems: result.count,
                    lastFollowUp: result.lastFollowUp
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
 * Service to get Both Bom Details and Item Info
 * based on BomID
 * 
 * @param {Object} reqParams
 * @param {Function} getDetailsCB 
 */
BomDetailService.getBomInfo = function(reqParams, getDetailsCB) {
    async.parallel({
        bomDetails: bomDetailDao.getBomDetailsById.bind(null, reqParams.bomId),
        totalCount: itemDetailService.getLineItemCount.bind(null, reqParams.bomId, 'all'),
        followUpCount: itemDetailService.getFollowUpCount.bind(null, reqParams.bomId,
            reqParams.duration),
        lastFollowUpDate: itemDetailService.getLastFollowUpDate.bind(null, reqParams.bomId)
    }, function(parallelErr, result) {
        if (parallelErr) {
            return getDetailsCB(parallelErr);
        }
        var bomDetails = result.bomDetails.dataValues;
        bomDetails.totalLineItems = result.totalCount;
        bomDetails.followUpCount = result.followUpCount;
        bomDetails.lastFollowUpDate = (result.lastFollowUpDate ||
            {followUpDate: null}).followUpDate;
        return getDetailsCB(null, bomDetails);
    });
};

module.exports = BomDetailService;
