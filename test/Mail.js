var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Mail Controller', function() {
    it('Send a follow-up mail', function(done) {
        var data = {
            userId: 'ftcc02',
            bomId: 'atcc05000_11071400_11_00_O00',
            customerPOId: 'test note',
            receivers: ['praveen.k.ext@siemens.com'],
            subject: 'UT-Server'
        };
        chai.request(app)
            .post('/LeadtimeService/api/mail/follow-up')
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });

    it('Send a follow-up mail - Fail Case', function(done) {
        var data = {
            userId: null,
            bomId: 'atcc05000_11071400_11_00_O00',
            customerPOId: 'test note',
            receivers: ['praveen.k.ext@siemens.com'],
            subject: 'UT-Server'
        };
        chai.request(app)
            .post('/LeadtimeService/api/mail/follow-up')
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(500);
                expect(response.body).to.be.an('object');
                done();
            });
    });

    it('Send a follow-up mail - Fail Case', function(done) {
        var data = {
            userId: 'ftcc02',
            bomId: 'atcc05000_11071400_11_00_O00',
            customerPOId: 'test note',
            receivers: [''],
            subject: 'UT-Server'
        };
        chai.request(app)
            .post('/LeadtimeService/api/mail/follow-up')
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(500);
                expect(response.body).to.be.an('object');
                done();
            });
    });
});