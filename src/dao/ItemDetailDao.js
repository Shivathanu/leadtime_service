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
ItemDetailDao.getHoldBomDetails = function(reqParams, whereParam, getBomsCB) {
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate'],
            [sequelize.fn('count', sequelize.col('bom_id')), 'followUpCount']
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
 * Dao method to get released bom details
 * 
 * @param {Object} reqParams
 * @param {Object} whereParam
 * @param {Function} getBomsCB
 */
ItemDetailDao.getReleasedBomDetails = function(reqParams, whereParam, getBomsCB) {
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate'],
            [sequelize.fn('count', sequelize.col('bom_id')), 'releaseCount']
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
 * Dao to get Hold Item details for a Bom
 * 
 * @param {String} bomId
 * @param {Object} whereParam
 * @param {Function} getItemsCB
 */
ItemDetailDao.getHoldItemsByBomId = function(bomId, whereParam, getItemsCB) {
    Models.ItemDetail.findAll({
        where: whereParam,
        order: ['followUpDate', 'itemId']
    }).then(function(lineItems) {
        return getItemsCB(null, lineItems);
    }, function(getError) {
        return getItemsCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

/**
 * Dao to get max Follow-up date of released items
 * 
 * @param {String} bomId
 * @param {Function} getDateCB
 */
ItemDetailDao.getMaxFollowUpDate = function(bomId, getDateCB) {
    Models.ItemDetail.find({
        attributes: ['followUpDate'],
        where: {
            bomId: bomId,
            status: constant.COMPLETEDSTATUS
        },
        group: ['follow_up_date'],
        order: [
            [sequelize.fn('max', sequelize.col('follow_up_date')), 'DESC']
        ]
    }).then(function(result) {
        return getDateCB(null, result);
    }, function(getError) {
        return getDateCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = ItemDetailDao;