//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Idea = require('../models/Idea');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Initial test', () => {

    /*
     * Test the API
     */
    describe('/GET api', () => {
        it('it should GET API', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);

                    var body =  res.body;
                    body.status.should.be.eql("connected");

                    done();
                });
        });
    });

});