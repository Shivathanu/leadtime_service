var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Bom detail Controller', function() {
    it('Get all Follow-up bom-details', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/follow-up/NA/dueToday/1/Hold')
            .end(function (error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('Get all Released bom-details', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/follow-up/NA/1/Released')
            .end(function (error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('Get Bom info by bom id', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/bom-info/batfs0600_12081701_07_00_M00')
            .end(function(error, response) {
                if(error) {
                    done(error);
                }
                expect(response.status).to.be.equal(200);
                expect(response.body).to.be.an('object');
                done();
            });
    });
});
