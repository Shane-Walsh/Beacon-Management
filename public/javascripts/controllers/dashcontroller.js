var app = angular.module('BeaconMgmt');


app.controller('dashController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = '';
}
]);