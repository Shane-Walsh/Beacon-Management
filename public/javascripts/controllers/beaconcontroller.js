var app = angular.module('BeaconMgmt');

app.controller('beaconController', ['$scope', '$http','$location',  function($scope, $http, $location) {

    $scope.message = 'List all beacons';
    $scope.selected = {}; //set to null-> getTemplate Edit beacon
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
    $scope.getTemplate = function (beacon) {
        if (beacon.beaconID === $scope.selected.beaconID){
            return 'edit';
        }
        else return 'display';
    };
    $scope.editBeacon = function (beacon) {
        $scope.selected = angular.copy(beacon);
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
