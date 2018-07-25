var sequelize = require('sequelize');
var Models = require('../models/index');
var constant = require('../util/Constant.js');
var ItemDetailDao = {};
var Op = sequelize.Op;

/**
 * Dao method to get all Boms by status
 * 
 * @param {String} status
 * @param {Function} getBomsCB
 */
ItemDetailDao.getAllBomsByStatus = function(status, getBomsCB) {
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate'],
            [sequelize.fn('count', sequelize.col('bom_id')), 'followUpCount']
        ],
        where: {
            status: status,
            followUpDate: {
                [Op.lte]: new Date()    // jshint ignore:line
            }
        },
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
 * Dao method to get line items per page by status
 * 
 * @param {Object} whereParam
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailDao.getLimitedBomsByStatus = function(whereParam, reqParams, getBomsCB) {
    var count = {
        Hold: 'followUpCount',
        Released: 'releaseCount'
    };
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate'],
            [sequelize.fn('count', sequelize.col('bom_id')), count[reqParams.status]]
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
 * @param {String} bomId
 * @param {Function} getCountCB
 */
ItemDetailDao.getCountByBomId = function(bomId, getCountCB) {
    Models.ItemDetail.count({
        where: {
            bomId: bomId
        }
    }).then(function(count) {
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
 * @param {Function} getItemsCB
 */
ItemDetailDao.getHoldItemsByBomId = function(bomId, getItemsCB) {
    Models.ItemDetail.findAll({
        where: {
            bomId: bomId,
            status: constant.HOLDSTATUS
        }
    }).then(function(lineItems) {
        return getItemsCB(null, lineItems);
    }, function(getError) {
        return getItemsCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = ItemDetailDao;