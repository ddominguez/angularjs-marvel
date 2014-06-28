'use strict';

var marvelApp = angular.module('marvelApp', []);
marvelApp.controller("comicsController", function($scope, $http) {
    $scope.comics = {};
    $http({
        method: 'GET',
        url: 'http://gateway.marvel.com:80/v1/public/comics?characters=1009313&apikey='+MARVEL_API_KEY
    }).
    success(function(data, status, headers, config) {
        $scope.comics = data.data.results;
    });
});