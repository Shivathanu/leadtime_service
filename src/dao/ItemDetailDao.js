var sequelize = require('sequelize');
var Models = require('../models/index');
var constant = require('../util/Constant.js');
var ItemDetailDao = {};

/**
 * Dao method to get all line items by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getItemsCB
 */
ItemDetailDao.getBomsByFollowUpDate = function(reqParams, getItemsCB) {
    Models.ItemDetail.findAll({
        attributes: [
            'bomId',
            [sequelize.fn('min', sequelize.col('follow_up_date')), 'followUpDate'],
            [sequelize.fn('count', sequelize.col('bom_id')), 'followUpCount']
        ],
        limit: constant.BOMDETAILPAGECOUNT,
        offset: constant.BOMDETAILPAGECOUNT * (reqParams.pageIndex - 1),
        where: {
            status: reqParams.status
        },
        group: ['bom_id'],
        order: [
            [sequelize.fn('min', sequelize.col('follow_up_date'))]
        ]
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
 * Dao method to get count of line items by bom id
 * 
 * @param {String} bomId
 * @param {Function} getItemsCB
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

module.exports = ItemDetailDao;