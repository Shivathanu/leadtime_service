var sequelize = require('sequelize');
var itemDetailDao = require('../dao/ItemDetailDao');
var constant = require('../util/Constant');
var ItemDetailService = {};
var Op = sequelize.Op;

/**
 * Service to get line items of particular bom
 *
 * @param {Object} reqParam
 * @param {Function} getCountCB
 */
ItemDetailService.getLineItemCount = function(reqParam, getCountCB) {
    itemDetailDao.getCountByBomId(reqParam, function(getError, lineItemList) {
        if(getError) {
            return getCountCB(getError);
        }   
        return getCountCB(null, lineItemList); 
    });
};

/**
 * Service to get all boms by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailService.getAllBomDetails = function(reqParams, getBomsCB) {
    itemDetailDao.getAllBomsByStatus(reqParams, function(getError, bomList) {
        if(getError) {
            return getBomsCB(getError);
        }   
        return getBomsCB(null, bomList); 
    });
};

/**
 * Service to get boms per page by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailService.getBomDetailsByPage = function(reqParams, getBomsCB) {
    var whereParam = {
        Hold: {
            status: constant.HOLDSTATUS,
            followUpDate: {
                [Op.gt]: new Date()    // jshint ignore:line
            }
        },
        Released: {
            status: constant.COMPLETEDSTATUS
        }
    };
    var queryParam = whereParam[reqParams.status];
    if (reqParams.itemId !== 'NA') {
        queryParam.itemId = {
            [Op.like]: '%' + reqParams.itemId + '%'    // jshint ignore:line
        };
    }
    itemDetailDao.getLimitedBomsByStatus(queryParam, reqParams,
        function(getError, bomList) {
        if(getError) {
            return getBomsCB(getError);
        }   
        return getBomsCB(null, bomList); 
    });
};

/**
 * Service to get Hold Line Items for a Bom
 * 
 * @param {String} bomId
 * @param {Function} getItemsCB
 */
ItemDetailService.getHoldItemsByBomId = function(bomId, getItemsCB) {
    itemDetailDao.getHoldItemsByBomId(bomId, function(getError, bomList) {
        if(getError) {
            return getItemsCB(getError);
        }   
        return getItemsCB(null, bomList); 
    });
};

module.exports = ItemDetailService;