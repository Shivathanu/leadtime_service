var Models = require('../models/index');
var BomDetailDao = {};
var constant = require('../util/Constant.js');

/**
 * Dao method to create new bom
 * 
 * @param {Object} reqparam
 * @param {Function} creatBomCB
 */
BomDetailDao.createBom = function(reqParam, createBomCB) {
    Models.BomDetail.create({
        bomId: reqParam.bomId,
        createdBy: reqParam.createdBy,
        createdByName: reqParam.createdByName,
        bomCreatedDate: new Date(reqParam.bomCreatedDate),
        soldToAcc: reqParam.soldToAcc,
    }).then(function(createdBom) {
        return createBomCB(null, createdBom);
    }, function(createError) {
        return createBomCB(createError);
    });    
};

/**
 * Dao to get page count of boms
 * 
 * @param {Object} reqParam
 * @param {Function} getPageCountCB
 */
BomDetailDao.getPageCount = function(reqParam, getPageCountCB){
    Models.BomDetail.count({
        where: {
            status: constant.HOLDSTATUS
        }
        }).then(function(pageCount) {
            return getPageCountCB(null, {count: pageCount});
        }, function(getError) {
            return getPageCountCB(getError);
    });
};

/**
 * Dao method to get all bom details.
 * 
 * @param {Object} reqParam
 * @param {Function} getAllBomDetailCB
 */
BomDetailDao.getAllBomDetail = function(reqParam, getAllBomDetailCB) {
    Models.BomDetail.findAll({
        include: {
            model: Models.ItemDetail,
            as: 'itemDetails',
            attributes: ['itemId', 'followUpDate', 'status'],
            where: {
                status: reqParam.status
            }
        },
        limit: constant.BOMDETAILPAGECOUNT,
        offset: constant.BOMDETAILPAGECOUNT * (reqParam.pageIndex - 1),
        order: [[
            {
                model: Models.ItemDetail,
                as: 'itemDetails',
            }, 
            'follow_up_date'
        ]],
        where: {
            status: reqParam.status
        }
    }).then(function(bomDetailList) {
        return getAllBomDetailCB(null, reqParam, bomDetailList);
    }, function(getError) {
        return getAllBomDetailCB(getError);
    });
};

/**
 * Dao method to get bom and corresponding line-item using id
 * 
 * @param {Object} reqParam
 * @param {Object} getBomByIdCB
 */
BomDetailDao.getBomById = function(reqParam, getBomByIdCB) {
    Models.BomDetail.find({
        attributes: ['bomId', 'soldToAcc', 'soldToAccName', 'orderNumber', 'customerPOId'],
        include: {
            model: Models.ItemDetail,
            as: 'itemDetails',
            where: {
                status: constant.HOLDSTATUS
            }
        },
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
        return getBomByIdCB(null, bom);
    }, function(getError) {
        return getBomByIdCB(getError);
    });
};

module.exports = BomDetailDao;