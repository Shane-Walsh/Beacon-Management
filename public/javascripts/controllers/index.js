var app = angular.module('BeaconMgmt');

app.controller('beaconController', ['$scope', '$http','$location', require('./beaconcontroller')]);