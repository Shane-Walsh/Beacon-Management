var app = angular.module('BeaconMgmt');

app.controller('addProdController', ['$scope','$location','$http',  function($scope, $location, $http) {

    $scope.message = 'Enter details to add a new product';

    $scope.formData = {};

    $scope.addProduct = function(){
        $http.post('/products', $scope.formData)
            .success(function(data) {
                $scope.beacons = data;
                $location.path('/products'); //send to list of products after add
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
]);