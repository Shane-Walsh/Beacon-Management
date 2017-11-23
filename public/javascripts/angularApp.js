var app = angular.module('BeaconMgmt', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            // route for the view All page
            .when('/viewall', {
                templateUrl : 'pages/viewall.ejs',
                controller  : 'viewAllController'
            });
    });


  
  


