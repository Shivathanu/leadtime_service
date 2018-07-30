/*jshint camelcase: false */
var httpRequest = require('request');

var AuthService = {
    verifyToken: function(environment, request, authCB) {
        if (environment === 'development') {
            return authCB(null);
        }
        var options = {
            url: 'https://dev2.compasquality.siemens-info.com/authserver/rest/verify/json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'st_token': request.headers.st_token
            }
        };
        httpRequest.post(options, function (error, response, result) {
            if (error) {
                return authCB(error);
            }
            if (response.statusCode === 200) {
                result = JSON.parse(result);
                if (result.status.code === '200' &&
                    result.status.message === 'authorized') {
                    return authCB(null, response);
                }
                return authCB(403, result);
            }
            return authCB(response.statusCode, result);
        });
    }
};

module.exports = AuthService;
