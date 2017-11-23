var app = angular.module('BeaconMgmt');

app.controller('viewAllController', ['$scope', '$http',  function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'List all beacons';

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

}
]);
