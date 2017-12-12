var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 50000;

var pageSelector ;

test.describe('Dashboard Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('dashboard');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/dashboard');
        driver.wait(until.elementLocated(pageSelector), 5000);
    } );
    test.it('shows the main body', function() {
        driver.findElement(pageSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    });
    test.it( 'shows the Beacons Panel', function() {
        driver.findElement(By.id('beaconsPanel')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('Beacons');
            });
        });
    } );

    test.it( 'shows the Beacons Square Menu', function() {
        driver.findElement(By.id('beaconSquareMenu')).then( function( element ) {
            expect(element).to.not.equal(null );
        });
    } );

    test.it( 'shows the Products Panel', function() {
        driver.findElement(By.id('productsPanel')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('Products');
            });
        });
    } );

    test.it( 'shows the Products Square Menu', function() {
        driver.findElement(By.id('productSquareMenu')).then( function( element ) {
            expect(element).to.not.equal(null );
        });
    } );

    test.it( 'shows the Vouchers Panel', function() {
        driver.findElement(By.id('vouchersPanel')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('Vouchers');
            });
        });
    } );

    test.it( 'shows the Vouchers Square Menu', function() {
        driver.findElement(By.id('voucherSquareMenu')).then( function( element ) {
            expect(element).to.not.equal(null );
        });
    } );

    test.after(function() {
        driver.quit();
    });
});