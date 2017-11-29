var app = angular.module('BeaconMgmt');

app.controller('addController', ['$scope','$location','$http',  function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Enter details to add a new beacon';

    $scope.formData = {};

    $scope.addBeacon = function(){
        $http.post('/beacons', $scope.formData)
            .success(function(data) {
                $scope.beacons = data;
                //  $location.path('/beacons');
                console.log(data);
                findAll();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
]);