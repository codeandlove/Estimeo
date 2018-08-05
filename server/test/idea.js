process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Idea = require('../models/Idea');
let Spectrum = require('../models/Spectrum');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Ideas', () => {
    before((done) => { // Empty the database before each test
        Idea.remove({}, (err) => {
            Spectrum.remove({}, (err) => {
                done();
            });
        });
    });

    /*
     * Test the api/ideas/ GET route
     */
    describe('/GET idea', () => {
        it('it should GET all ideas', (done) => {
            chai.request(server)
                .get('/api/ideas')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST idea', () => {

        it('it should not POST an idea without data', (done) => {
            let idea = {};
            chai.request(server)
                .post('/api/ideas')
                .send(idea)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('it should not POST an idea with invalid politicalSpectrum id', (done) => {
            let idea = {'politicalSpectrum': 'xxx', 'text': 'test'};
            chai.request(server)
                .post('/api/ideas')
                .send(idea)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('it should POST an idea', (done) => {
            new Spectrum({'example':"example" ,slug: "test_spec", 'name': "Test Spec"})
                .save({new: true}, (err, spec) => {
                    var specId  = spec._id;
                    let idea = {
                        'politicalSpectrum': specId,
                        'text': 'test'
                    };

                    chai.request(server)
                        .post('/api/ideas')
                        .send(idea)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('idea');
                            res.body.idea.should.have.property('text').eql('test');
                            res.body.idea.should.have.property('accepted').eql(false);

                            const idea = res.body.idea;
                            done();
                        });
                })
        });

        it('it should find new idea', (done) => {
            chai.request(server)
                .get('/api/ideas')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                    const idea = res.body.idea;
                    done();
                });
        });

        it('it should not find new idea in accepted ideas', (done) => {
            chai.request(server)
                .get('/api/ideas/accepted')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);

                    const idea = res.body.idea;
                    done();
                });
        });
    });


});