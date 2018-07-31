var sequelize = require('sequelize');
var itemDetailDao = require('../dao/ItemDetailDao');
var constant = require('../util/Constant');
var ItemDetailService = {};
var Op = sequelize.Op;

/**
 * Service to get line items count of particular bom
 *
 * @param {String} bomId
 * @param {String} type
 * @param {Function} getCountCB
 */
ItemDetailService.getLineItemCount = function(bomId, type, getCountCB) {
    var countParam = {
        where: {
            bomId: bomId
        }
    };
    if (type === 'hold') {
        countParam.where.status = constant.HOLDSTATUS;
    }
    itemDetailDao.getCountByBomId(countParam, function(getError, lineItemList) {
        if(getError) {
            return getCountCB(getError);
        }   
        return getCountCB(null, lineItemList); 
    });
};

/**
 * Service to get follow-up items count for specific duration
 * 
 * @param {String} bomId
 * @param {String} duration
 * @param {Function} getCountCB
 */
ItemDetailService.getFollowUpCount = function(bomId, duration, getCountCB) {
    var countParam = {
        where: {
            bomId: bomId
        }
    };
    if (duration !== 'NA') {
        /* jshint ignore:start */
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var followUpDate = {
            pastDue: { [Op.lt]: date },
            dueToday: { [Op.eq]: date },
            oneWeek: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month, day + 7) }]
            },
            oneMonth: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month + 1, day) }]
            }
        }
        countParam.where.followUpDate = followUpDate[duration];
        /* jshint ignore:end */
    }
    itemDetailDao.getCountByBomId(countParam, function(getError, lineItemList) {
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
        status: constant.HOLDSTATUS
    };
    if (reqParams.duration !== 'NA') {
        /* jshint ignore:start */
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var followUpDate = {
            pastDue: { [Op.lt]: date },
            dueToday: { [Op.eq]: date },
            oneWeek: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month, day + 7) }]
            },
            oneMonth: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month + 1, day) }]
            }
        }
        whereParam.followUpDate = followUpDate[reqParams.duration];
        /* jshint ignore:end */
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
 * @param {String} reqParams
 * @param {Function} getItemsCB
 */
ItemDetailService.getHoldItems = function(reqParams, getItemsCB) {
    var whereParam = {
        bomId: reqParams.bomId,
        status: constant.HOLDSTATUS
    };
    if (reqParams.duration !== 'NA') {
        /* jshint ignore:start */
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var followUpDate = {
            pastDue: { [Op.lt]: date },
            dueToday: { [Op.eq]: date },
            oneWeek: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month, day + 7) }]
            },
            oneMonth: {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lte]: new Date(year, month + 1, day) }]
            }
        }
        whereParam.followUpDate = followUpDate[reqParams.duration];
        /* jshint ignore:end */
    }
    if (reqParams.type === 'parent') {
        whereParam.parentId = {
            [Op.eq]: ''    // jshint ignore:line
        };
    }
    if (reqParams.itemId !== 'NA') {
        whereParam.itemId = {
            [Op.like]: '%' + reqParams.itemId + '%'    // jshint ignore:line
        };
    }
    itemDetailDao.getHoldItemsByBomId(reqParams.bomId, whereParam, function(getError, bomList) {
        if(getError) {
            return getItemsCB(getError);
        }   
        return getItemsCB(null, bomList); 
    });
};

/**
 * Service to get Last follow-up date of released items
 * 
 * @param {String} bomId
 * @param {Function} getDateCB
 */
ItemDetailService.getLastFollowUpDate = function(bomId, getDateCB) {
    itemDetailDao.getMaxFollowUpDate(bomId, function(getError, result) {
        if (getError) {
            return getDateCB(getError);
        }
        return getDateCB(null, result);
    });
};

module.exports = ItemDetailService;