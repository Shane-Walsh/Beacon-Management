var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 50000;

var pageSelector ;

test.describe('Beacons List Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('beaconsList');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/beacons');
        driver.wait(until.elementLocated(pageSelector), 5000);
    } );
    test.it('shows the main body', function() {
        driver.findElement(pageSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    });
    test.it( 'shows the main header', function() {
        driver.findElement(By.tagName('h4')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('List of Bluetooth Beacons');
            });
        });
    } );

    test.it( 'displays the table headers', function() {
        driver.findElement(By.id('Name')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('NAME');
            });
            driver.findElement(By.id('Venue')).then( function( element ) {
                element.getText().then(function(text) {
                    expect(text).to.equal('VENUE');
                });
                driver.findElement(By.id('Platform')).then( function( element ) {
                    element.getText().then(function(text) {
                        expect(text).to.equal('PLATFORM');
                    });
                    driver.findElement(By.id('Active')).then( function( element ) {
                        element.getText().then(function(text) {
                            expect(text).to.equal('ACTIVE');
                        });
                        driver.findElement(By.id('Remove')).then( function( element ) {
                            element.getText().then(function(text) {
                                expect(text).to.equal('REMOVE');
                            });
                            driver.findElement(By.id('Edit')).then( function( element ) {
                                element.getText().then(function(text) {
                                    expect(text).to.equal('EDIT');
                                });

                            });
                        });
                    });
                });
            });
        });
    });
    test.it( 'shows the buttons', function() {
        driver.findElement(By.id('listActive')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('List Active');
            });
            driver.findElement(By.id('listDormant')).then(function (element) {
                element.getText().then(function (text) {
                    expect(text).to.equal('List Dormant');
                });
            });
            driver.findElement(By.id('viewAll')).then(function (element) {
                element.getText().then(function (text) {
                    expect(text).to.equal('View All');
                });
            });
            driver.findElement(By.id('addBeacon')).then(function (element) {
                element.getText().then(function (text) {
                    expect(text).to.equal('Add');
                });
            });
        });
    });

    test.it( 'displays the table contents', function() {
        driver.findElement(By.id('beaconName')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('testname');
            });
        });
        driver.findElement(By.id('beaconVenue')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('TestVenue');
            });
        });
        driver.findElement(By.id('beaconPlatform')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('TestPlatform');
            });
        });
        driver.findElement(By.id('beaconActive')).then(function (element) {
            element.getText().then(function (text) {
                expect(text).to.equal('true');
            });
        });
    });//end test

    test.after(function() {
        driver.quit();
    });
});
