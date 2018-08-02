var sequelize = require('sequelize');
var Models = require('../models/index');
var constant = require('../util/Constant.js');
var ItemDetailDao = {};

/**
 * Dao method to get all Boms by status
 * 
 * @param {Object} reqParams
 * @param {Object} whereParam
 * @param {Function} getBomsCB
 */
ItemDetailDao.getFollowUpBomDetails = function(reqParams, whereParam, getBomsCB) {
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate']
        ],
        limit: constant.PAGECOUNT,
        offset: constant.PAGECOUNT * (reqParams.pageIndex - 1),
        where: whereParam,
        group: ['bom_id'],
        order: [
            [sequelize.fn('min', sequelize.col('follow_up_date'))]
        ]
    }).then(function(lineItems) {
        return getBomsCB(null, lineItems);
    }, function(getError) {
        return getBomsCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

/**
 * Dao method to get count of line items by bom id
 * 
 * @param {Object} countParam
 * @param {Function} getCountCB
 */
ItemDetailDao.getCountByBomId = function(countParam, getCountCB) {
    Models.ItemDetail.count(countParam).then(function(count) {
        return getCountCB(null, count);
    }, function(countErr) {
        return getCountCB({
            error: countErr.name,
            message: countErr.parent.message
        });
    });
};

/**
 * Dao to get all Item Details
 * 
 * @param {Object} findParam
 * @param {Function} getDetailsCB
 */
ItemDetailDao.getItemDetails = function(findParam, getDetailsCB) {
    Models.ItemDetail.findAll(findParam).then(function(items) {
        return getDetailsCB(null, items);
    }, function(getError) {
        return getDetailsCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

/**
 * Dao to get Item Detail by item id
 * 
 * @param {String} itemId
 * @param {String} bomId
 * @param {Function} getDetailCB
 */
ItemDetailDao.getItemDetailById = function(itemId, bomId, getDetailCB) {
    Models.ItemDetail.find({
        where: {
            itemId: itemId,
            bomId: bomId
        }
    }).then(function(itemDetail) {
        return getDetailCB(null, itemDetail);
    }, function(getError) {
        return getDetailCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

/**
 * Dao to get all child line items by parent id
 * 
 * @param {String} parentId
 * @param {String} bomId
 * @param {Function} getDetailsCB
 */
ItemDetailDao.getChildItemDetailsById = function(parentId, bomId, getDetailsCB) {
    Models.ItemDetail.findAll({
        where: {
            parentId: parentId,
            bomId: bomId
        },
        order: ['item_id']
    }).then(function(itemDetails) {
        return getDetailsCB(null, itemDetails);
    }, function(getError) {
        return getDetailsCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = ItemDetailDao;