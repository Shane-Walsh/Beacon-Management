var app = angular.module('BeaconMgmt');

app.controller('addVoucherController', ['$scope','$location','$http',  function($scope, $location, $http) {

    $scope.message = 'Enter details to add a new voucher';

    $scope.formData = {};

    $scope.addVoucher = function(){
        $http.post('/vouchers', $scope.formData)
            .success(function(data) {
                $scope.beacons = data;
                $location.path('/vouchers'); //send to list of vouchers after add
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
]);