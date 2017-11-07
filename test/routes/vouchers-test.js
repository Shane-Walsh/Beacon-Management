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

var voucher = require('../../models/vouchers');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var expect = chai.expect;
var _ = require('lodash' );
var express = require('express');
var router = express.Router();
var db = require('../../dbconnection');

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Vouchers Endpoints', function (){

    beforeEach(function(done){
        //remove all data from db before each test
        voucher.remove({},function(err) {

            //create a test instance of Beacon
            var newVoucher1 = new voucher();

            newVoucher1.active = false;
            newVoucher1.description = "testdesc1";
            newVoucher1.value = 100;
            newVoucher1.type = "testtype1";
            newVoucher1.save(function (err) {
                if(err)
                    console.log("Error Saving to database" + err);
                else{
                    //create a 2nd test instance of Beacon
                    var newVoucher2 = new voucher();

                    newVoucher2.active = true;
                    newVoucher2.description = "testdesc2";
                    newVoucher2.value = 200;
                    newVoucher2.type = "testtype2";
                    newVoucher2.save(function (err) {
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
        voucher.remove({},function(err) {

            if(err)
                console.log("Error removing data" + err);
            else
                done();
        });
    });
    describe.only('Get All /vouchers', function () {
        it('should return all vouchers', function(done) {

            chai.request(server).get('/vouchers').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.equal(2);

                var result = _.map(res.body, function (vouchers) {
                    return { type: vouchers.type, value: vouchers.value, description: vouchers.description, active: vouchers.active}
                });
                expect(result[0]).to.include({type: "testtype1", value: 100, description: "testdesc1", active: false});
                expect(result[1]).to.include({type: "testtype2", value: 200, description: "testdesc2", active: true});
                done();

            });
        });
    });
    describe.only('Get /voucher', function(){
        it('should show message when voucher not found', function(done){
            chai.request(server).get('/vouchers/invalid').end(function(err,res){

                expect(res).to.have.status(200);
                expect(res).to.be.be.a('object');
                expect(res.body.message).equal('Voucher NOT Found!');
                done();
            });
        });
    });
   describe.only('POST /vouchers', function(){
        it('should confirm add voucher to collection ', function(done){
            var testVoucher = {"type":"coupon","value":20,"description":"Winter Sales","active":true};

            chai.request(server)
                .post('/vouchers')
                .send(testVoucher)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Voucher Added!');
                    done();
                });
        });
    });
});
