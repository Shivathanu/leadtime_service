var bomDetailDao = require('../dao/BomDetailDao');
var BomDetailService = {};

/**
 * Service to create new bom
 * 
 * @param { Object } reqParam
 * @param {Function} creatBomCB
 */
BomDetailService.createBom = function(reqParam, creatBomCB) {
    bomDetailDao.createBom(reqParam, function(createError, createdBom) {
        if(createError) {
            return creatBomCB(createError);
        }
        return creatBomCB(null, createdBom);
    });
};

/**
 * Service to get all bom details
 * 
 * @param {Object} reqParam
 * @param {Function} getPageCountCB
 */
BomDetailService.getPageCount = function(reqParam, getPageCountCB) {
    bomDetailDao.getPageCount(reqParam, function(getError, pageCount) {
        if(getError) {
            return getPageCountCB(getError);
        }
        return getPageCountCB(null, pageCount);
    });
};


/**
 * Service to get all bom details
 * 
 * @param {Object} reqParam
 * @param {Function} getAllBomDetailCB
 */
BomDetailService.getAllBomDetail = function(reqParam, getAllBomDetailCB) {
    bomDetailDao.getAllBomDetail(reqParam, function(getError, bomDetailList) {
        if(getError) {
            return getAllBomDetailCB(getError);
        }
        return getAllBomDetailCB(null, bomDetailList);
    });
};

module.exports = BomDetailService;
