var app = angular.module('BeaconMgmt');

app.controller('beaconController', ['$scope', '$http',  function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'List all beacons';

    $scope.formData = {};
    //$scope.newBeacon = [];

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
    $scope.delete = function(name) {
        if (confirm("Are you sure you want to delete this Beacon?")){
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
    $scope.addBeacon = function(){
        //$scope.formData.paymenttype = $scope.formData.paymentOptions.name;
        $http.post('/beacons', $scope.formData)
            .success(function(data) {
                $scope.beacons = data;
                //$location.path('/beacons');
                console.log(data);
                findAll();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
]);
