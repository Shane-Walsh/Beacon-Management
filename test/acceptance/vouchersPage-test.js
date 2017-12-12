var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;

var pageSelector ;

test.describe('Vouchers Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('vouchers');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/vouchers');
        driver.wait(until.elementLocated(pageSelector), 2000);
    } );
    test.it('shows the main body', function() {
        driver.findElement(pageSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    });
    test.it( 'shows the main header', function() {
        driver.findElement(By.tagName('h5')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.equal('List all vouchers');
            });
        });
    } );
    test.after(function() {
        driver.quit();
    });
});