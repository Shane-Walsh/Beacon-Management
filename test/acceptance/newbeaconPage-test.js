var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 50000;

var pageSelector ;


test.describe('New Beacon Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('newBeacon');

    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/newbeacon');
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
                expect(text).to.equal('Enter details to add a new beacon');
            });
        });
    } );
    test.it( 'shows the form', function() {
        driver.findElement(By.tagName('form')).then(function(elements) {
            expect(elements).to.not.equal(null );
            elements.getText().then(function(text) {
                expect(text).to.equal('Submit');
            } )  ;
        });
    } );
    test.it( 'shows the button', function() {
        driver.findElement(By.tagName('button')).then(function(elements) {
            expect(elements).to.not.equal(null );
        });
    } );

    test.it( 'submits form information', function() {
        var select = driver.findElement(By.id('nameInput'));
        select.then(function(element) {
                element.sendKeys('TestName');
            } )
            .then(function() {
                return driver.findElement(By.id('venueInput'));
            })
            .then(function(element) {
                element.sendKeys('TestVenue');
            })
            .then(function() {
                return driver.findElement(By.id('platformInput'));
            })
            .then(function(element) {
                element.sendKeys('TestPlatform');
            })
            .then(function() {
                return driver.findElement(By.id('activeInput'));
            })
            .then(function(element) {
                element.sendKeys('true');
            })
            .then(function() {
                return driver.findElement(By.id('submit'));
            })
            .then(function(element) {
                element.submit();
            } );
    } );

    test.after(function() {
        driver.quit();
    });
});

