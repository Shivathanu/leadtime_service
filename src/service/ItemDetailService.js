var sequelize = require('sequelize');
var async = require('async');
var _ = require('lodash');
var itemDetailDao = require('../dao/ItemDetailDao');
var constant = require('../util/Constant');
var ItemDetailService = {};
var Op = sequelize.Op;

/**
 * Service to get line items count of particular bom
 *
 * @param {String} bomId
 * @param {Function} getCountCB
 */
ItemDetailService.getLineItemCount = function(bomId, getCountCB) {
    var countParam = {
        where: {
            bomId: bomId
        }
    };
    itemDetailDao.getCountByBomId(countParam, function(getError, lineItemList) {
        /* istanbul ignore if */
        if(getError) {
            return getCountCB(getError);
        }   
        return getCountCB(null, lineItemList); 
    });
};

/**
 * Method to get parent or child line item ids list
 * 
 * @param {Object} whereParam 
 * @param {String} itemType 
 * @param {Function} getListCB 
 */
var getItemsList = function(whereParam, itemType, getListCB) {
    whereParam.parentId = {
        [Op.eq]: ''    // jshint ignore:line
    };
    var findParam = {
        attributes: [
            ['item_id', 'itemId']
        ],
        where: whereParam,
        group: ['item_id']
    };
    if (itemType === 'child') {
        whereParam.parentId = {
            [Op.ne]: ''    // jshint ignore:line
        };
        findParam = {
            attributes: [
                ['parent_id', 'itemId']
            ],
            where: whereParam,
            group: ['parent_id']
        };
    }
    itemDetailDao.getItemDetails(findParam, function(itemErr, result) {
        /* istanbul ignore if */
        if (itemErr) {
            return getListCB(itemErr);
        }
        return getListCB(null, result);
    });
};

/**
 * Method to get all follow-up line item ids list
 * 
 * @param {Object} reqParams 
 * @param {Function} getItemsCB 
 */
var getFollowUpItemsList = function(reqParams, getItemsCB) {
    var whereParam = {
        bomId: reqParams.bomId,
        status: constant.HOLDSTATUS
    };
    if (reqParams.duration && (reqParams.duration !== 'NA')) {
        /* jshint ignore:start */
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var dateParam = {
            pastDue: {
                requiredReleaseDate: { [Op.lt]: date }
            },
            dueToday: {
                requiredReleaseDate: { [Op.gte]: date },
                followUpDate: { [Op.lte]: date }
            },
            oneWeek: {
                followUpDate: { [Op.gt]: new Date(year, month, day + 5)}
            },
            oneMonth: {
                followUpDate: { [Op.gt]: new Date(year, month, day + 30)}
            }
        };
        whereParam = _.extend(whereParam, dateParam[reqParams.duration]);
        /* jshint ignore:end */
    }
    if (reqParams.itemId !== 'NA') {
        whereParam.itemId = {
            [Op.like]: '%' + reqParams.itemId + '%'    // jshint ignore:line
        };
    }
    async.parallel({
        parent: getItemsList.bind(null, whereParam, 'parent'),
        child: getItemsList.bind(null, whereParam, 'child')
    }, function (parallelErr, result) {
        if (parallelErr) {
            return getItemsCB(parallelErr);
        }
        var itemList = _.unionBy(result.parent, result.child, function(value) {
            return value.dataValues.itemId;
        });
        return getItemsCB(null, itemList);
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
    var reqParams = {
        bomId: bomId,
        duration: duration,
        itemId: 'NA'
    };
    getFollowUpItemsList(reqParams, function(listErr, list) {
        if (listErr) {
            return getCountCB(listErr);
        }
        return getCountCB(null, list.length);
    });
};

/**
 * Service to get hold boms per page by Follow up date
 * 
 * @param {Object} reqParams
 * @param {Function} getBomsCB
 */
ItemDetailService.getHoldBomDetails = function(reqParams, getBomsCB) {
    var whereParam = {
        status: reqParams.status
    };
    if (reqParams.duration !== 'NA') {
        /* jshint ignore:start */
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var dateParam = {
            pastDue: {
                requiredReleaseDate: { [Op.lt]: date }
            },
            dueToday: {
                requiredReleaseDate: { [Op.gte]: date },
                followUpDate: { [Op.lte]: date }
            },
            oneWeek: {
                followUpDate: { [Op.gt]: new Date(year, month, day + 5) }
            },
            oneMonth: {
                followUpDate: { [Op.gt]: new Date(year, month, day + 30) }
            }
        };
        whereParam = _.extend(whereParam, dateParam[reqParams.duration]);
        /* jshint ignore:end */
    }
    if (reqParams.bomId !== 'NA') {
        whereParam.bomId = {
            [Op.like]: '%' + reqParams.bomId + '%'    // jshint ignore:line
        };
    }
    if (reqParams.status === 'Released') {
        whereParam.followUpDate = {
            [Op.ne]: null    // jshint ignore:line
        };
    }
    itemDetailDao.getFollowUpBomDetails(reqParams, whereParam, function(getError, bomList) {
        if(getError) {
            return getBomsCB(getError);
        }   
        return getBomsCB(null, bomList); 
    });
};


/**
 * Method to get all parent Item Details
 * 
 * @param {Array} items 
 * @param {String} bomId 
 * @param {Boolean} isDeliverable
 * @param {Function} getDetailsCB 
 */
var getItemDetailsList = function(items, bomId, isDeliverable, getDetailsCB) {
    async.map(items, function(item, asyncCB) {
        itemDetailDao.getItemDetailById(item.itemId, bomId, isDeliverable,
            function(itemErr, itemDetail) {
            if (itemErr) {
                return asyncCB(itemErr);
            }
            return asyncCB(null, itemDetail);
        });
    }, function(mapErr, itemDetails) {
        if (mapErr) {
            return getDetailsCB(mapErr);
        }
        var result = _.sortBy(_.compact(itemDetails), ['followUpDate']);
        return getDetailsCB(null, result);
    });
};

/**
 * Method to get all child Item Details
 * 
 * @param {Array} items 
 * @param {Array} itemDetails 
 * @param {String} bomId
 * @param {String} type 
 * @param {Function} getDetailsCB 
 */
var getChildItemDetails = function(items, itemDetails, bomId, type, getDetailsCB) {
    if (type === 'parent') {
        return getDetailsCB(null, itemDetails);
    }
    async.map(items, function(item, asyncCB) {
        itemDetailDao.getChildItemDetailsById(item.itemId, bomId, function(itemErr, childDetails) {
            if (itemErr) {
                return asyncCB(itemErr);
            }
            var details = _.union(
                _.filter(itemDetails, function(detail) { return detail.itemId === item.itemId; }),
                childDetails);
            return asyncCB(null, details);
        });
    }, function(mapErr, itemDetails) {
        if (mapErr) {
            return getDetailsCB(mapErr);
        }
        var result = _.flatMapDeep(itemDetails);
        return getDetailsCB(null, result);
    });
};

/**
 * Service to get all follow-up line items for a bom
 * 
 * @param {Object} reqParams
 * @param {Function} getItemsCB
 */
ItemDetailService.getFollowUpItems = function(reqParams, getItemsCB) {
    var items;
    async.waterfall([
        async.apply(getFollowUpItemsList, reqParams),
        function(itemList, passParamsCB) {
            items = itemList;
            return passParamsCB(null, itemList, reqParams.bomId, reqParams.type === 'child');
        },
        getItemDetailsList,
        function(itemDetails, passParamsCB) {
            return passParamsCB(null, items, itemDetails, reqParams.bomId, reqParams.type);
        },
        getChildItemDetails
    ], function(waterfallErr, result) {
        /* istanbul ignore if */
        if (waterfallErr) {
            return getItemsCB(waterfallErr);
        }
        return getItemsCB(null, result);
    });
};

module.exports = ItemDetailService;