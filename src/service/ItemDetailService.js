var itemDetailDao = require('../dao/ItemDetailDao');
var ItemDetailService = {};

/**
 * Service to create new line item
 * 
 * @param {Object} reqParam
 * @param {Function} createdLineItemCB
 */
ItemDetailService.createdLineItem = function(reqParam, createdLineItemCB) {
    itemDetailDao.createdLineItem(reqParam, function(createError, lineItem) {
        if(createError) {
            return createdLineItemCB(createError);
        }
        return createdLineItemCB(null, lineItem);
    });
};

/**
 * Service to get line items of particular bom
 *
 * @param {Object} reqParam
 * @param {Function} getLineItemByBomIdCB
 *
 */
ItemDetailService.getLineItemByBomId = function(reqParam, getLineItemByBomIdCB) {
    itemDetailDao.getLineItemByBomId(reqParam, function(getError, lineItemList) {
        if(getError) {
            return getLineItemByBomIdCB(getError);
        }   
        return getLineItemByBomIdCB(null, lineItemList); 
    });
};

module.exports = ItemDetailService;