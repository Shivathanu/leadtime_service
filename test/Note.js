var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Note Controller', function() {
    it('Create a new note', function(done) {
        var data = {
            userId: 'ftcc02',
            bomId: 'atcc05000_11071400_11_00_O00',
            content: 'test note',
            createdAt: new Date()
        };
        chai.request(app)
            .post('/LeadtimeService/api/note/create')
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(error, response) {
                if (error) {
                    done(error);
                }
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('object');
                done();
            });
    });

    it('Create a new note - Fail Case', function(done) {
        var data = {
            userId: 'ftcc02',
            bomId: null,
            content: 'test note',
            createdAt: new Date()
        };
        chai.request(app)
            .post('/LeadtimeService/api/note/create')
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

    it('Get all notes', function(done) {
        chai.request(app)
            .get('/LeadtimeService/api/note/atcc05000_11071400_11_00_O00')
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