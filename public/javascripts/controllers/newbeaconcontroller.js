var app = angular.module('BeaconMgmt');

app.controller('addController', ['$scope','$location','$http',  function($scope, $location, $http) {

    $scope.message = 'Enter details to add a new beacon';

    $scope.formData = {};

    $scope.addBeacon = function(){
        $http.post('/beacons', $scope.formData)
            .success(function(data) {
                $scope.beacons = data;
                $location.path('/beacons'); //send to list of beacons after add
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
]);