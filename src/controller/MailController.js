var express = require('express');
var MailController = express.Router();
var mailService = require('../service/MailService');
var logger = require('../../config/log');

/**
 * Controller to match router "/api/mail/follow-up"
 * 
 * @param {Object} request
 * @param {Object} response
 */
MailController.post('/follow-up', function(request, response) {
    mailService.sendFollowUpMail(request.body, function(mailErr, result) {
        if (mailErr) {
            logger.error('Error while sending follow-up mails', {
                error: mailErr,
                params: request.body
            });
            response.status(500).send(mailErr);
        }
        response.send(result);
    });
});

module.exports = MailController;
