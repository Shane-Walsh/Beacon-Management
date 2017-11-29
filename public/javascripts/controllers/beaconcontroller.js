var app = angular.module('BeaconMgmt');

app.controller('beaconController', ['$scope', '$http','$location',  function($scope, $http, $location) {
    // create a message to display in our view
    $scope.message = 'List all beacons';

    $scope.view = true;

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

    $scope.changeView = function(){
        if($scope.view == true){
            $scope.view = false;
        }
        else{
            $scope.view = true;
        }
    };

}
]);
