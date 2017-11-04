/*
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
*/

var beacon = require('../../models/beacons');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var _ = require('lodash' );
var express = require('express');
var router = express.Router();

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Beacon Endpoints', function (){

    describe.only('Get All /beacons', function () {
        it('should return all beacons', function(done) {

            chai.request('http://localhost:3000').get('/beacons').end(function(err,res){

                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');

            done();

            });
        });
    });
    describe.only('Get One /beacons', function(){
        it('should return only one beacon', function(done) {

            chai.request('http://localhost:3000').get('/beacons/name').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');

                done();

            });
        });
        it('should show message when beacon not found', function(done){
            chai.request('http://localhost:3000').get('/beacons/invalid').end(function(err,res){

                    expect(res).to.have.status(200);
                    expect(res.body.message).equal('Beacon NOT Found!');
                    done();
                });
        });
    });
    describe.only('POST /beacons', function(){
        it('should confirm add beacon to collection ', function(done){
            var newBeacon = {
                name: 'test',
                venue: 'test venue',
                platform: 'test platform',
                active: false,
                date: Date.now
            };
            chai.request('http://localhost:3000')
                .post('/beacons')
                .send(newBeacon)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Beacon Added!');
                    done();
                });
        });
    });
    describe.only('DELETE /beacons/:name', function () {

        it('should delete beacon from collection by name', function(done) {
            chai.request('http://localhost:3000')
                .delete('/beacons/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Beacon Deleted!');
                    done();
                });
        });
    });

});
