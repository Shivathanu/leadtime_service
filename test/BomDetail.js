var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Bom detail Controller', function() {
    it('Get all Follow-up bom-details', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/follow-up/a/pastDue/1/Hold')
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
            .get('/LeadtimeService/api/bom-detail/follow-up/NA/NA/1/Released')
            .end(function (error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('Get Follow-up bom-details - Fail case', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/follow-up/NA/pastDue/0/Hold')
            .end(function (error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(500);
                expect(response.body).to.be.an('object');
                done();
            });
    });

    it('Get Bom info by bom id', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/bom-detail/bom-info/atcc05000_11071400_11_00_O00')
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
