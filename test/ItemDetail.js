var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Item detail Controller', function() {
    it('Get Item details by bomid - Parent items', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/item-detail/follow-up' +
                '/parent/NA/batfs0600_12081701_07_00_M00')
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('Get Item details by bomid and itemid - Parent and Child items', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/item-detail/follow-up' +
                '/child/21000/atcc05000_11071400_11_00_O00')
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