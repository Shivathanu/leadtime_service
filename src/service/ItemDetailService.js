var sequelize = require('sequelize');
var itemDetailDao = require('../dao/ItemDetailDao');
var constant = require('../util/Constant');
var ItemDetailService = {};
var Op = sequelize.Op;

/**
 * Service to get line items of particular bom
 *
 * @param {Object} reqParam
 * @param {Function} getCountCB
 */
ItemDetailService.getLineItemCount = function(reqParam, getCountCB) {
    itemDetailDao.getCountByBomId(reqParam, function(getError, lineItemList) {
        if(getError) {
            return getCountCB(getError);
        }   
        return getCountCB(null, lineItemList); 
    });
};

/**
 * Service to get hold boms per page by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailService.getFollowUpBomDetails = function(reqParams, getBomsCB) {
    var whereParam = {
        status: constant.HOLDSTATUS,
        followUpDate: {
            [Op.gt]: new Date()    // jshint ignore:line
        }
    };
    if (reqParams.type === 'today') {
        whereParam.followUpDate = {
            [Op.lte]: new Date()    // jshint ignore:line
        };
    }
    if (reqParams.bomId !== 'NA') {
        whereParam.bomId = {
            [Op.like]: '%' + reqParams.bomId + '%'    // jshint ignore:line
        };
    }
    itemDetailDao.getHoldBomDetails(reqParams, whereParam, function(getError, bomList) {
        if(getError) {
            return getBomsCB(getError);
        }   
        return getBomsCB(null, bomList); 
    });
};

/**
 * Service to get completed boms per page by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailService.getCompletedBomDetails = function(reqParams, getBomsCB) {
    var whereParam = {
        status: constant.COMPLETEDSTATUS
    };
    if (reqParams.bomId !== 'NA') {
        whereParam.bomId = {
            [Op.like]: '%' + reqParams.bomId + '%'    // jshint ignore:line
        };
    }
    itemDetailDao.getReleasedBomDetails(reqParams, whereParam,
        function(getError, bomList) {
        if(getError) {
            return getBomsCB(getError);
        }   
        return getBomsCB(null, bomList); 
    });
};

/**
 * Service to get Hold Line Items for a Bom
 * 
 * @param {String} bomId
 * @param {String} type
 * @param {Function} getItemsCB
 */
ItemDetailService.getHoldItemsByBomId = function(bomId, type, getItemsCB) {
    var parent = {
        [Op.eq]: ''    // jshint ignore:line
    };
    if (type === 'child') {
        parent = {
            [Op.ne]: ''    // jshint ignore:line
        };
    }
    itemDetailDao.getHoldItemsByBomId(bomId, parent, function(getError, bomList) {
        if(getError) {
            return getItemsCB(getError);
        }   
        return getItemsCB(null, bomList); 
    });
};

module.exports = ItemDetailService;