var Models = require('../models/index');
var BomDetailDao = {};

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
 * Dao method to get all bom details.
 * 
 * @param {Function} getAllBomDetailCB
 */
BomDetailDao.getAllBomDetail = function(getAllBomDetailCB) {
    Models.BomDetail.findAll().then(function(bomDetailList) {
        return getAllBomDetailCB(null, bomDetailList);
    }, function(getError) {
        return getAllBomDetailCB(getError);
    });
};

module.exports = BomDetailDao;