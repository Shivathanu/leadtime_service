var Models = require('../models/index');
var constant = require('../util/Constant.js');
var ItemDetailDao = {};

/**
 * Dao method to create new line item
 * 
 * @param {Object} reqParam
 * @param {Object} createdLineItemCB
 */
ItemDetailDao.createdLineItem = function(reqParam, createdLineItemCB) {
    Models.ItemDetail.create(reqParam).then(function(lineItem) {
        return createdLineItemCB(null, lineItem);
    }, function(createError) {
        return createdLineItemCB({
            error: createError.name,
            message: createError.parent.message
        });
    });
};

/**
 * Dao method to get all line items by bomid
 * 
 * @param {Object} reqParam
 * @param {Object} getLineItemByBomIdCB
 */
ItemDetailDao.getLineItemByBomId = function(reqParam, getLineItemByBomIdCB) {
    Models.ItemDetail.findAll({
        where: {
            status: constant.HOLDSTATUS,
            bomId: reqParam.bomId
        }
    }).then(function(lineItemList) {
        return getLineItemByBomIdCB(null, lineItemList);
    }, function(getError) {
        return getLineItemByBomIdCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};


module.exports = ItemDetailDao;