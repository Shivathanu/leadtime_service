var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Item detail model', function() {
    it('Get item detail by bomid', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/item-detail/all/batfs0600_12081701_07_00_M00')
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});