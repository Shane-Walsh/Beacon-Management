var app = angular.module('BeaconMgmt', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            // route for the beacons page
            .when('/beacons', {
                templateUrl : 'pages/beacons.ejs',
                controller  : 'beaconController'
            })

            // route for the products page
            .when('/products', {
                templateUrl : 'pages/products.ejs',
                controller  : 'productController'
            })

            // route for the vouchers page
             .when('/vouchers', {
                templateUrl : 'pages/vouchers.ejs',
                controller  : 'voucherController'
            });
});


  
  


