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

    $scope.getTemplate = function (beacon) {
        if (beacon._id === $scope.selected._id) {
            return 'edit';
        } else {
            return 'display';
        }
    };

    $scope.editBeacon = function (beacon) {
        console.log(JSON.stringify(beacon))
        $scope.selected = angular.copy(beacon);
    };

    $scope.updateVenue = function (venue, platform, active, data) {
        'use strict';

        $http.put('/beacons/' + data.name + '/venue/',{ "venue": venue}).success(function (data) {

            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

        $http.put('/beacons/' + data.name + '/platform/',{ "platform": platform}).success(function (data) {
            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

        $http.put('/beacons/' + data.name + '/status/',{ "active": active}).success(function (data) {
            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

    };// End Edit

    $scope.reset = function () {
        $scope.selected = {}
    };

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

    $scope.findByName = function (query) {

        console.log('Here is Query: ' + query);

        $http.get('beacons/' + query).success(function (data) {

            $scope.beacons = data;
            console.log('Here is Data after: ' + data);
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
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
