var app = angular.module('BeaconMgmt');

app.controller('productController', ['$scope', '$http',  function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'List all products';

    findAllproducts();

    function findAllproducts() {
        $http.get('/products')
            .success(function (data) {
                $scope.products = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
]);
