var path = require('path');
var async = require('async');
var ejs = require('ejs');
var noteService = require('../service/NoteService');
var itemDetailService = require('../service/ItemDetailService');
var mailDao = require('../dao/MailDao');
var mailSender = require('../scripts/MailSender');
var constant = require('../util/Constant');
var MailService = {};
var env = process.env.NODE_ENV || 'development';
var environment = require('../../config/datasources.config').url[env];

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
        /* istanbul ignore if */
        if(renderError) {
            return generateCB(renderError);
        }
        return generateCB(null, template);
    });
};

/**
 * Method to save mail status log
 * 
 * @param {Object} reqParams 
 * @param {Array} mailList 
 * @param {Function} logMailCB 
 */
var saveMailLog = function(reqParams, mailList, logMailCB) {
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
        /* istanbul ignore if */
        if (mapErr) {
            return logMailCB(mapErr);
        }
        return logMailCB(null, result);
    });
};

/**
 * Method to save mail sent status as note log
 * 
 * @param {Object} reqParams 
 * @param {Function} logNoteCB 
 */
var saveNoteLog = function(reqParams, logNoteCB) {
    var noteParams = {
        userId: reqParams.userId,
        bomId: reqParams.bomId,
        createdAt: new Date()
    };
    noteParams.content = 'Follow-up mail sent to ' + reqParams.receivers.join() + ' on ' +
        noteParams.createdAt.toLocaleDateString();
    noteService.createNewNote(noteParams, function(noteErr, note) {
        /* istanbul ignore if */
        if (noteErr) {
            return logNoteCB(noteErr);
        }
        return logNoteCB(null, note);
    });
};

/**
 * Method to log sent mails as both mail and note logger
 * 
 * @param {Object} reqParams 
 * @param {Array} mailList 
 * @param {Function} logCB 
 */
var logSentMails = function(reqParams, mailList, logCB) {
    async.parallel({
        mailLog: saveMailLog.bind(null, reqParams, mailList),
        noteLog: saveNoteLog.bind(null, reqParams)
    }, function(parallelErr, result) {
        /* istanbul ignore if */
        if (parallelErr) {
            return logCB(parallelErr);
        }
        return logCB(null, result.noteLog);
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
                itemDetails: itemDetails,
                customerName: reqParams.customerName,
                environment: environment
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
