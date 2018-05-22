var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Bom detail model', function() {
    it('Get all (Hold) bom-details', function(done) {
        chai.request(app)
        .get('/LeadtimeService/api/bom-detail/all/Hold/1')
        .end(function (error, response) {
            if (error) {
                done(error);
            }
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            done();
        });
    });

    it('Get all (Released) bom-details', function(done) {
        chai.request(app)
        .get('/LeadtimeService/api/bom-detail/all/Released/1')
        .end(function (error, response) {
            if (error) {
                done(error);
            }
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            done();
        });
    });

    it('Get count of hold bom list', function(done) {
        chai.request(app)
        .get('/LeadtimeService/api/bom-detail/count')
        .end(function (error, response) {
            if (error) {
                done(error);
            }
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            done();
        });
    });

    it('Get item detail and bom detail by bom id', function(done) {
        chai.request(app)
        .get('/LeadtimeService/api/bom-detail/bom-info/batfs0600_12081701_07_00_M00')
        .end(function(error, response) {
            if(error) {
                done(error);
            }
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.ItemDetails).to.be.an('array');
            done();
        });
    });
});
