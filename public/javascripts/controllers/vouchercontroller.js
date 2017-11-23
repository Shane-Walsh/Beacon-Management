var app = angular.module('BeaconMgmt');

app.controller('voucherController', ['$scope', '$http',  function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'List all vouchers';

    findAllvouchers();

    function findAllvouchers() {
        $http.get('/vouchers')
            .success(function (data) {
                $scope.vouchers = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
]);
