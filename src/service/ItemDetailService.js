var itemDetailDao = require('../dao/ItemDetailDao');
var ItemDetailService = {};

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
 * @param {Object} reqParam
 * @param {Function} getBomsCB
 */
ItemDetailService.getBomsByDate = function(reqParam, getBomsCB) {
    itemDetailDao.getBomsByFollowUpDate(reqParam, function(getError, bomList) {
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