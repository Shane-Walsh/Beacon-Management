var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;

var pageSelector ;


test.describe('New Beacon Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('newBeacon');
        //navBarSelector = By.tagName('nav');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/newbeacon');
        driver.wait(until.elementLocated(pageSelector), 2000);
    } );
    test.it('shows the main body', function() {
        driver.findElement(pageSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    });

    /*test.it( 'shows the nav bar', function() {
        driver.findElement(navBarSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    } );

    test.it( 'shows the buttons', function() {
        driver.findElements(By.tagName('button')).then(function(elements) {
            expect(elements).to.not.equal(null );
            elements[0].getText().then(function(text) {
                expect(text).to.equal('Register');
            } )  ;
            elements[1].getText().then(function(text) {
                expect(text).to.equal('Log In');
            } )  ;
        });
    } );*/

    test.it( 'shows the main header', function() {
        driver.findElement(By.tagName('h4')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('Enter details to add a new beacon');
            });
        });
    } );

    test.after(function() {
        driver.quit();
    });
});

