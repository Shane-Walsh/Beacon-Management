var app = angular.module('BeaconMgmt');

app.controller('beaconController', ['$scope', '$http','$location',  function($scope, $http, $location) {

    $scope.message = 'List all beacons';
    $scope.selected = {};

    findAll();

    function findAll() {
        $http.get('/beacons')
            .success(function (data) {
                $scope.beacons = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    /*==================== EDIT =================*/
    $scope.getTemplate = function (beacon) {
        if (beacon._id === $scope.selected._id) {
            return 'edit';
        } else {
            return 'display';
        }
    };
    $scope.reset = function () {
        $scope.selected = {}
    };
    $scope.editBeacon = function (beacon) {
        console.log(JSON.stringify(beacon))
        $scope.selected = angular.copy(beacon);
    };


    $scope.updateVenue = function (beacon) {
        'use strict';
        console.log('Here is BEACON: ' + beacon);
        console.log(JSON.stringify(beacon.name));
        console.log('Here is my beacon: ' + JSON.stringify(beacon));
        $http.put('/beacons/' + beacon.name, beacon.venue).success(function (data) {

            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });
    }; // End Edit

    $scope.listActive = function () {

        $http.get('beacons/:status/active').success(function (data) {
            console.log(data);
            $scope.beacons = data;
            //$location.path('/beacons');
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.listInActive = function () {

        $http.get('beacons/:status/dormant').success(function (data) {
            console.log(data);
            $scope.beacons = data;
            //$location.path('/beacons');
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.viewAll = function(){

        $http.get('beacons').success(function (data) {
            console.log(data);
            $scope.beacons = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });

    };

    $scope.findOne = function (query) {

        $http.get('beacons/' + query).success(function (data) {
            console.log('Here is Data: ' + data);
            console.log('Here is Query: ' + query);
            $scope.beacons = data;
            console.log('Here is Data after: ' + data);
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };


    $scope.delete = function(name) {
        if (confirm("Are you sure you want to remove this Beacon?")){
            console.log('Deleting Beacon: ' + name);
            $http.delete('/beacons/' + name)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };
}
]);
