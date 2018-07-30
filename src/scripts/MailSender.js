var nodemailer = require('nodemailer');
var config = require('../../config/mail.config');

/**
 * Mail Sender using nodemailer
 * 
 * @param {Object} mailParams
 * @param {Function} mailCB
 */
var MailSender = {
    sendMail: function(mailParams, mailCB) {
        var transporter = nodemailer.createTransport(config.smtp);
        var options = {
            from: config.mailId,
            to: mailParams.receiverId,
            subject: mailParams.subject,
            html: mailParams.html
        };
        transporter.sendMail(options, function(sendErr, response) {
            if (sendErr) {
                return mailCB(sendErr);
            }
            return mailCB(null, response);
        });
    }
};

module.exports = MailSender;
