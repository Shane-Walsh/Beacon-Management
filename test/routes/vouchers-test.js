/*
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
*/

var vouchers = require('../../models/vouchers');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var _ = require('lodash' );
var express = require('express');
var router = express.Router();
var db = require('../../dbconnection');

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Vouchers Endpoints', function (){

    describe.only('Get All /vouchers', function () {
        it('should return all vouchers', function(done) {

            chai.request('http://localhost:3000').get('/vouchers').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');

                done();

            });
        });
    });
    describe.only('Get One /voucher', function(){
        it('should return only one voucher', function(done) {

            chai.request('http://localhost:3000').get('/vouchers/id').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');

                done();

            });
        });
        it('should show message when voucher not found', function(done){
            chai.request('http://localhost:3000').get('/vouchers/invalid').end(function(err,res){

                expect(res).to.have.status(200);
                expect(res.body.message).equal('Voucher NOT Found!');
                done();
            });
        });
    });
    describe.only('POST /vouchers', function(){
        it('should confirm add voucher to collection ', function(done){
            var newVoucher = {
                type: 'test',
                value: 20,
                description: 'test',
                active: false,
                date: Date.now
            };
            chai.request('http://localhost:3000')
                .post('/vouchers')
                .send(newVoucher)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Voucher Added!');
                    done();
                });
        });
    });
});
