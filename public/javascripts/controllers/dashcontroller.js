var app = angular.module('BeaconMgmt');


app.controller('dashController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Dashboards';

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
}
]);