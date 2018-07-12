var Models = require('../models/index');
var BomDetailDao = {};
var constant = require('../util/Constant.js');

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
 * @param {Object} reqParam
 * @param {Function} getBomCB
 */
BomDetailDao.getBomDetailsById = function(reqParam, getBomCB) {
    Models.BomDetail.find({
        attributes: ['bomId', 'soldToAcc', 'soldToAccName', 'orderNumber', 'customerPOId'],
        include: [{
            model: Models.ItemDetail,
            as: 'itemDetails',
            where: {
                status: constant.HOLDSTATUS
            }
        }, {
            model: Models.ContactUser,
            as: 'contactUser',
            attributes: ['name', 'emailId', 'address', 'homePhoneNumber']
        }],
        order: [[
            {
                model: Models.ItemDetail,
                as: 'itemDetails'
            }, 
            'follow_up_date'
        ]],
        where: {
            bomId: reqParam.bomId,
            status: constant.HOLDSTATUS
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