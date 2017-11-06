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
var server =  require('../../app');
var expect = chai.expect;
var db = require('../../dbconnection');

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

describe('Beacon Endpoints', function (){

    beforeEach(function(done){
        //remove all data from db before each test
        beacon.remove({},function(err) {

            var newBeacon1 = new beacon();

            newBeacon1.active = false;
            newBeacon1.platform = "testPlatform1";
            newBeacon1.venue = "testVenue1";
            newBeacon1.name = "testBeacon1";
            newBeacon1.save(function (err) {
                if(err)
                    console.log("Error Saving to database" + err);
                else{

                    var newBeacon2 = new beacon();

                    newBeacon2.active = false;
                    newBeacon2.platform = "testPlatform2";
                    newBeacon2.venue = "testVenue2";
                    newBeacon2.name = "testBeacon2";
                    newBeacon2.save(function (err) {
                        if(err)
                            console.log("Error Saving to database" + err);
                        else
                            done();
                    });
                }
            });
        });
    });

    describe.only('Get All /beacons', function () {
        it('should return all beacons', function(done) {

            chai.request(server).get('/beacons').end(function(err,res){

                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();

            });
        });
    });
    describe.only('Get One /beacons', function(){
        it('should return only one beacon', function(done) {

            chai.request(server).get('/beacons/name').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
        });
        it('should show message when beacon not found', function(done){
            chai.request(server).get('/beacons/invalid').end(function(err,res){

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
            chai.request(server)
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
            chai.request(server)
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
