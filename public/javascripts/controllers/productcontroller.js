var app = angular.module('BeaconMgmt');

app.controller('productController', ['$scope', '$http',  function($scope, $http) {

    $scope.message = 'List all products';
    $scope.selected = {};

    findAll();

    function findAll() {
        $http.get('/products')
            .success(function (data) {
                $scope.products = data;
                console.log(data);
                $scope.reset();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.viewAll = function(){

        $http.get('products').success(function (data) {
            console.log(data);
            $scope.products = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });

    };

    $scope.getTemplate = function (product) {
        if (product._id === $scope.selected._id) {
            return 'edit';
        } else {
            return 'display';
        }
    };

    $scope.editProduct = function (product) {
        console.log(JSON.stringify(product))
        $scope.selected = angular.copy(product);
    };

    $scope.updateProduct = function (brand, type, description, price, data) {
        'use strict';

        $http.put('/products/' + data.designation + '/brand/',{ "brand": brand}).success(function (data) {

            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

        $http.put('/products/' + data.designation + '/type/',{ "type": type}).success(function (data) {
            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

        $http.put('/products/' + data.designation + '/description/',{ "description": description}).success(function (data) {
            console.log('Stringify Data: ' + JSON.stringify(data));
            findAll();
            $scope.reset();
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });

        $http.put('/products/' + data.designation + '/price/',{ "price": price}).success(function (data) {
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

    $scope.delete = function(designation) {
        if (confirm("Are you sure you want to remove this Product?")){
            console.log('Deleting Product: ' + designation);
            $http.delete('/products/' + designation)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    $scope.searchBrand = function(query) {

        console.log('Here is Search Query: ' + query);

        $http.get('/products/brand/search/',{ "brand": query}).success(function (data) {
            console.log('Here is Data b4 scope: ' + data);
            $scope.products = data;
            console.log('Here is Data after: ' + data);
        }).error(function (data) {
            console.log('Error: ' + data);
            findAll();
            $scope.reset();
        });
    }
}
]);
