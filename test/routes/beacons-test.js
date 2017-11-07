/*
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
REF: https://mochajs.org
REF: https://gist.github.com/yoavniran/1e3b0162e1545055429e#mocha
REF: https://stackoverflow.com/questions/40309713/how-to-send-query-string-parameters-using-supertest
REF: https://stackoverflow.com/questions/37129668/how-to-write-post-request-to-node-js-server-using-mocha-and-what-are-the-js-need
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

            //create a test instance of Beacon
            var newBeacon1 = new beacon();

            newBeacon1.active = false;
            newBeacon1.platform = "testplatform1";
            newBeacon1.venue = "testvenue1";
            newBeacon1.name = "testbeacon1";
            newBeacon1.save(function (err) {
                if(err)
                    console.log("Error Saving to database" + err);
                else{
                    //create a 2nd test instance of Beacon
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
                expect(res).to.be.be.a('object');
                expect(res.body.message).equal('Beacon NOT Found!');
                done();
            });
        });
    });
    describe.only('POST /beacons', function(){
        it('should show message if beacon Added', function(done){

            var testBeacon = {"name": "beacon1", "venue": "Electronic Store", "platform": "Eddystone", "active": true};

                    chai.request(server)
                    .post('/beacons')
                    .send(testBeacon)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.be.a('object');
                        expect(res.body).to.have.property('message').equal('Beacon Added!');
                        done();
                        });
        });
        it('should show message if beacon already exists', function(done) {

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
                    expect(res).to.be.be.a('object');
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

                    var result = _.map(res.body, function (beacons) {
                        return { active: beacons.active}
                    });

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res).to.be.be.a('object');
                    expect(result).to.include({ active: true});
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });
    describe.only('GET /beacons/:status/dormant', function () {

        it('should list all Dormant beacons', function(done) {
            chai.request(server)
                .get('/beacons/status/dormant')
                .end(function(err, res) {

                    var result = _.map(res.body, function (beacons) {
                        return { active: beacons.active}
                    });
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res).to.be.be.a('object');
                    expect(result).to.include({ active: false});
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });
    describe.only('PUT /beacons/:name/venue', function () {

        it('should updated beacon venue + confirm', function(done) {
            chai.request(server)
                .put('/beacons/testbeacon1/venue')
                .query({"venue": "updated venue"})
                .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.be.a('object');
                        expect(res.body).to.have.property('message').equal('Venue Updated!');
                        done();
                    });
        });
    });
    describe.only('PUT /beacons/:name/platform', function () {

        it('should updated platform venue + confirm', function(done) {
            chai.request(server)
                .put('/beacons/testbeacon1/platform')
                .query({"platform":"platform updated"})
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Platform Updated!');
                    done();
                });
        });
    });
    describe.only('GET FuzzySearch /beacons/:name/venue', function () {

        it('should return matching venue of partial search', function(done) {
            chai.request(server)
                .get('/beacons/venue/search')
                .query({"venue":"venue"})
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.be.a('object');
                    expect(res.type).to.eql("application/json");
                    expect(res.body.length).to.eql(2);
                    done();
                });
        });
        it('should return 0 no matches found', function(done) {
            chai.request(server)
                .get('/beacons/venue/search')
                .query({"venue":"invalidsearch"})
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.be.a('object');
                    expect(res.type).to.eql("application/json");
                    expect(res.body.length).to.eql(0);
                    done();
                });
        });
    });
    describe.only('PUT /beacons/:name/status', function () {

        it('should set beacon status: dormant', function(done) {
            chai.request(server)
                .put('/beacons/testbeacon1/status')
                .query({"active": false})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Beacon now Dormant');
                    done();
                });
        });
    });
});
