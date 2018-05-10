var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('User Model', function() {
    it('Get all Users', function (done) {
        chai.request(app)
            .get('/LeadtimeService/api/user/all')
            .end(function (error, response) {
                expect(response.status).to.equal(200);
                done();
            });
    });
});
