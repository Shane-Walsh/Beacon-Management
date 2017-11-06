/*
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
REF: https://mochajs.org
REF: https://gist.github.com/yoavniran/1e3b0162e1545055429e#mocha
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
            newBeacon1.platform = "testplatform1";
            newBeacon1.venue = "testvenue1";
            newBeacon1.name = "testbeacon1";
            newBeacon1.save(function (err) {
                if(err)
                    console.log("Error Saving to database" + err);
                else{

                    var newBeacon2 = new beacon();

                    newBeacon2.active = true;
                    newBeacon2.platform = "testplatform2";
                    newBeacon2.venue = "testvenue2";
                    newBeacon2.name = "testbeacon2";
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
    afterEach(function (done) {
        //Clean db of data after each test
        beacon.remove({},function(err) {

            if(err)
                console.log("Error removing data" + err);
            else
                done();
        });

    });

    describe.only('Get All /beacons', function () {
        it('should return all beacons', function(done) {

            chai.request(server).get('/beacons').end(function(err,res){

                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);

                    var result = _.map(res.body, function (beacons) {
                    return { name: beacons.name, venue: beacons.venue, platform: beacons.platform, active: beacons.active}
                    });
                    expect(result[0]).to.include({name: "testbeacon1", venue: "testvenue1", platform: "testplatform1", active: false});
                    expect(result[1]).to.include({name: "testbeacon2", venue: "testvenue2", platform: "testplatform2", active: true});
                    done();
            });
        });
    });
    describe.only('Get One /beacons/name', function(){
        it('should return only one beacon by name', function(done) {

            chai.request(server).get('/beacons/testbeacon1').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.name).equal("testbeacon1");
                expect(res.body.venue).equal("testvenue1");
                expect(res.body.platform).equal("testplatform1");
                expect(res.body.active).equal(false);
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
        it('should show message if beacon already exists', function(done){

            var newBeacon = new beacon();

            newBeacon.active = false;
            newBeacon.platform = "testplatform1";
            newBeacon.venue = "testvenue1";
            newBeacon.name = "testbeacon1";
            newBeacon.save(function (err) {
                if(err)
                    console.log("Error Saving to database" + err);
                else {
                    chai.request(server)
                    .post('/beacons')
                    .send(newBeacon)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Beacon Name already exists');
                        done();
                        });
                    }
            });
        });
    });
    describe.only('DELETE /beacons/:name', function () {

        it('should delete beacon from collection by name + confirm', function(done) {
            chai.request(server)
                .delete('/beacons/testbeacon1')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Beacon Deleted!');
                    done();
                });
        });
    });
    describe.only('GET /beacons/:status/active', function () {

        it('should list all active beacons', function(done) {
            chai.request(server)
                .get('/beacons/status/active')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');

                    var result = _.map(res.body, function (beacons) {
                        return { active: beacons.active}
                    });
                    expect(result).to.include({ active: true});
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });

});
