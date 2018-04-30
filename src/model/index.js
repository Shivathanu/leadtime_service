var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var connection = require('../connection/connection');
var dir = path.join(__dirname, '/');

var models = {};

/**
 * Read all models in "model" directory
 * 
 * @param {Function} readCB 
 */
var readModels = function (readCB) {
    fs.readdir(dir, function (error, files) {
        if (error) {
            return readCB(error);
        }
        files = _.without(files, 'index.js');
        return readCB(null, files);
    });
};

/**
 * Import all models in sequelize
 * 
 * @param {Array} files 
 * @param {Function} getCB 
 */
var getModels = function (files, getCB) {
    async.each(files, function (file, asyncCB) {
        var model = connection.import(dir + file);
        models[model.name] = model;
        return asyncCB(null);
    }, function (eachErr) {
        if (eachErr) {
            return getCB(eachErr);
        }
        return getCB(null);
    });
};

/**
 * Associate all models
 * 
 * @param {Function} associateCB 
 */
var associateModels = function (associateCB) {
    async.mapValues(models, function (model, name, asyncCB) {
        if (_.has(model.options, 'associate')) {
            model.options.associate(models);
        }
        return asyncCB(null);
    }, function (mapErr) {
        if (mapErr) {
            return associateCB(mapErr);
        }
        return associateCB(null);
    });
};

/**
 * Synchronize all models to the database
 * 
 * @param {Function} syncCB 
 */
var syncModels = function (syncCB) {
    connection.sync({alter: true}).then(function () {
        return syncCB(null);
    }, function (syncErr) {
        return syncCB(syncErr);
    });
};

/**
 * Waterfall method to migrate and associate all models to the database
 * 
 * @param {Function} migrateCB 
 */
var migrateModels = function (migrateCB) {
    async.waterfall([
        async.apply(readModels),
        getModels,
        associateModels,
        syncModels
    ], function (waterfallErr) {
        if (waterfallErr) {
            return migrateCB(waterfallErr);
        }
        return migrateCB(null);
    });
};

/**
 * Trigger method to synchronize models
 */
migrateModels(function (migrateErr) {
    if (migrateErr) {
        console.error('Model synchronization failed:', migrateErr);        
    } else {
        console.log('Model synchronization done.');
    }
});

module.exports = models;
