var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;

var pageSelector ;

test.describe('Index Page', function() {
    this.timeout(mochaTimeOut);
    test.before(function () {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        pageSelector = By.id('indexPage');
    });
    test.beforeEach(function () {
        driver.get('http://localhost:3000/#/');
        driver.wait(until.elementLocated(pageSelector), 2000);
    });
    test.it('shows the main body', function () {
        driver.findElement(pageSelector)
            .then(function (element) {
                expect(element).to.not.equal(null);
            });
    });

    test.it('shows the Side Nav Bar', function () {
        driver.findElement(By.id('dashboard')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('DASHBOARD');
            });
        });
        driver.findElement(By.id('beacons')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('BEACONS');
            });
        });
        driver.findElement(By.id('products')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('PRODUCTS');
            });
        });
        driver.findElement(By.id('vouchers')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('VOUCHERS');
            });
        });
        driver.findElement(By.id('maps')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('MAPS');
            });
        });
        driver.findElement(By.id('slack')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('SLACK');
            });
        });

    });
    test.it( 'shows the Top Nav Bar', function() {
        driver.findElement(By.tagName('nav')).then(function(elements) {
            expect(elements).to.not.equal(null );
        });
    });

    test.it( 'shows the footer', function() {
        driver.findElement(By.tagName('footer')).then(function(elements) {
            expect(elements).to.not.equal(null );
        });
        driver.findElement(By.id('footerTag')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('© 2017 Shane Walsh');
            });
        });
    });
    test.after(function () {
        driver.quit();
    });
});
