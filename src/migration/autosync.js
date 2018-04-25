var fs = require('fs');
var _ = require('lodash');
var path = '../model/';

/**
 * Script to synchronize all models in "model" directory
 */
fs.readdir(__dirname + '/' + path, function (error, files) {
    _.each(files, function (file) {
        var model = require(path + file);
        model.sync({alter: true}, function (error) {
            if (error) {
                console.error('Model synchronization failed', error);
            }
        });
    });
});
