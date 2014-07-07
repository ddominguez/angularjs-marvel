'use strict';
var characterId = 1009313;
// var characterId = 1009368;
var app = angular.module('marvelApp', []);

app.controller("characterController", ['$scope', '$http', function($scope, $http) {
    $scope.data = {};
    $http({
        method: 'GET',
        url: 'http://gateway.marvel.com:80/v1/public/characters/'+characterId+'?apikey='+MARVEL_API_KEY
    }).
    success(function(data, status, headers, config) {
        $scope.data = data.data.results[0];
        console.log($scope.data);
    });
}]);
