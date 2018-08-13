var path = require('path');
var async = require('async');
var ejs = require('ejs');
var itemDetailService = require('../service/ItemDetailService');
var mailDao = require('../dao/MailDao');
var mailSender = require('../scripts/MailSender');
var constant = require('../util/Constant');
var MailService = {};

/**
 * Method to send mail to a group of receivers
 * 
 * @param {DOM} template
 * @param {Object} reqParams
 * @param {Function} sendMailCB
 */
var sendMails = function(template, reqParams, sendMailCB) {
    async.mapSeries(reqParams.receivers, function(receiverId, asyncCB) {
        var mailParams = {
            receiverId: receiverId,
            subject: reqParams.subject || 'Purchase Order - Customer Support',
            html: template
        };
        mailSender.sendMail(mailParams, function(mailErr, response) {
            if (mailErr) {
                return asyncCB(mailErr);
            }
            return asyncCB(null, {
                receiverId: receiverId,
                messageId: response.messageId
            });
        });
    }, function(mapErr, result) {
        if (mapErr) {
            return sendMailCB(mapErr);
        }
        return sendMailCB(null, result);
    });
};

/**
 * Method to generate html template from ejs
 * 
 * @param {Object} templateParams 
 * @param {Function} generateCB 
 */
var generateFollowUpTemplate = function(templateParams, generateCB) {
    var templatePath = path.join(__dirname, '../templates/MailContent.ejs');
    ejs.renderFile(templatePath, {data: templateParams},
        function(renderError, template) {
        if(renderError) {
            return generateCB(renderError);
        }
        return generateCB(null, template);
    });
};

/**
 * Method to log sent mails
 * 
 * @param {Object} reqParams 
 * @param {Array} mailList 
 * @param {Function} logCB 
 */
var logSentMails = function(reqParams, mailList, logCB) {
    async.map(mailList, function(mail, asyncCB) {
        var mailParams = {
            userId: reqParams.userId,
            receiverId: mail.receiverId,
            messageId: mail.messageId,
            bomId: reqParams.bomId,
            status: constant.MAILSENTSTATUS,
            createdAt: new Date()
        };
        mailDao.saveMailLog(mailParams, function(saveErr, mailLog) {
            if (saveErr) {
                return asyncCB(saveErr);
            }
            return asyncCB(null, mailLog);
        });
    }, function(mapErr, result) {
        if (mapErr) {
            return logCB(mapErr);
        }
        return logCB(null, result);
    });
};

/**
 * Service to send follow-up mail to a group of receivers
 * 
 * @param {Object} reqParams
 * @param {Function} sendMailCB
 */
MailService.sendFollowUpMail = function(reqParams, sendMailCB) {
    var itemParams = {
        bomId: reqParams.bomId,
        duration: 'NA',
        itemId: 'NA',
        type: 'child'
    };
    async.waterfall([
        async.apply(itemDetailService.getFollowUpItems, itemParams),
        function(itemDetails, passResultCB) {
            var result = {
                bomId: reqParams.bomId,
                customerPOId: reqParams.customerPOId,
                itemDetails: itemDetails
            };
            return passResultCB(null, result);
        },
        generateFollowUpTemplate,
        function(template, passParamsCB) {
            return passParamsCB(null, template, reqParams);
        },
        sendMails,
        function(mailList, passParamsCB) {
            return passParamsCB(null, reqParams, mailList);
        },
        logSentMails
    ], function(waterfallErr, result) {
        if (waterfallErr) {
            return sendMailCB(waterfallErr);
        }
        return sendMailCB(null, result);
    });
};

module.exports = MailService;
