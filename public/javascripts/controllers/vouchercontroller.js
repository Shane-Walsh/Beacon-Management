var app = angular.module('BeaconMgmt');

app.controller('voucherController', ['$scope', '$http',  function($scope, $http) {

    $scope.message = 'List all vouchers';
    $scope.selected = {};

    findAll();

    function findAll() {
        $http.get('/vouchers')
            .success(function (data) {
                $scope.vouchers = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTemplate = function (voucher) {

        if (voucher._id === $scope.selected._id) {
            return 'edit';
        } else {
            return 'display';
        }
    };

    $scope.editVoucher = function (voucher) {
        console.log(JSON.stringify(voucher))
        $scope.selected = angular.copy(voucher);
    };

    $scope.updateVoucher = function (value, data) {
        'use strict';

        $http.put('/vouchers/' + data._id + '/value/',{ "value": value}).success(function (data) {

            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

    };// End Edit

    $scope.reset = function () {
        $scope.selected = {}
    };

    $scope.delete = function(id) {
        if (confirm("Are you sure you want to remove this Voucher?")){
            console.log('Deleting Product: ' + id);
            $http.delete('/vouchers/' + id)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };
}
]);
