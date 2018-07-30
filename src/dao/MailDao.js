var Models = require('../models/index');
var MailDao = {};

/**
 * Method to save a mail log
 * 
 * @param {Object} mailParams
 * @param {Function} saveCB
 */
MailDao.saveMailLog = function(mailParams, saveCB) {
    Models.Mail.create(mailParams).then(function(mail) {
        return saveCB(null, mail);
    }, function(createErr) {
        return saveCB(createErr);
    });
};

module.exports = MailDao;
