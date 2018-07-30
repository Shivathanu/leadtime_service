var Models = require('../models/index');
var BomDetailDao = {};

/**
 * Dao method to get bom and corresponding line-item using id
 * 
 * @param {Object} reqParam
 * @param {Function} getBomCB
 */
BomDetailDao.getBomInfoById = function(bomId, getBomCB) {
    Models.BomDetail.find({
        where: {
            bomId: bomId
        }
    }).then(function(bom) {
        return getBomCB(null, bom);
    }, function(getError) {
        return getBomCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

/**
 * Dao method to get bom details by bom id
 * 
 * @param {String} bomId
 * @param {Function} getBomCB
 */
BomDetailDao.getBomDetailsById = function(bomId, getBomCB) {
    Models.BomDetail.find({
        attributes: ['bomId', 'soldToAcc', 'soldToAccName', 'orderNumber', 'customerPOId'],
        where: {
            bomId: bomId
        }
    }).then(function(bom) {
        return getBomCB(null, bom);
    }, function(getError) {
        return getBomCB({
            error: getError.name,
            message: getError.parent.message
        });
    });
};

module.exports = BomDetailDao;