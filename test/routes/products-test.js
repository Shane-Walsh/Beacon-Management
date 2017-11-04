/*
REF: SSD4 Agile S/W Practice course material Lab 6 API testing
REF: https://www.terlici.com/2014/09/15/node-testing.html
REF: https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
REF: https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
REF: http://chaijs.com/api/bdd/
REF: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wf3v42-7WRt
*/

var product = require('../../models/products');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var _ = require('lodash' );
var express = require('express');
var router = express.Router();

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Product Endpoints', function (){

    describe.only('Get All /products', function () {
        it('should return all products', function(done) {

            chai.request('http://localhost:3000').get('/products').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');

                done();

            });
        });
    });
    describe.only('Get One /product', function(){
        it('should return only one product', function(done) {

            chai.request('http://localhost:3000').get('/products/designation').end(function(err,res){

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');

                done();

            });
        });
        it('should show message when product not found', function(done){
            chai.request('http://localhost:3000').get('/products/invalid').end(function(err,res){

                expect(res).to.have.status(200);
                expect(res.body.message).equal('Product NOT Found!');
                done();
            });
        });
    });
    describe.only('POST /products', function(){
        it('should confirm add product to collection ', function(done){
            var newProduct = {
                brand: 'test',
                type: 'test',
                description: 'test',
                price: 100,
                designation: 'test',
                date: Date.now
            };
            chai.request('http://localhost:3000')
                .post('/products')
                .send(newProduct)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Product Added!');
                    done();
                });
        });
    });
    describe.only('DELETE /products/:designation', function () {

        it('should delete a product from collection by designation', function(done) {
            chai.request('http://localhost:3000')
                .delete('/products/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).be.be.a('object');
                    expect(res.body).to.have.property('message').equal('Product Deleted!');
                    done();
                });
        });
    });

});
