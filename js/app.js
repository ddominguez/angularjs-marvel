'use strict';

var characterId = 1009313;
// var characterId = 1009368;
var app = angular.module('marvelApp', ['ngAnimate']);

app.factory('comicsService', function($rootScope) {
    var comicsService = {};
    comicsService.comicsURI = '';

    comicsService.prepForBroadcast = function(uri) {
        this.comicsURI = uri;
        this.broadcastItem();
    };

    comicsService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return comicsService;
});

app.controller("characterController", ['$scope', '$http', 'comicsService', function($scope, $http, comicsService) {
    $scope.data = {};
    $http({
        method: 'GET',
        url: 'http://gateway.marvel.com:80/v1/public/characters/'+characterId+'?apikey='+MARVEL_API_KEY
    }).
    success(function(data, status, headers, config) {
        $scope.data = data.data.results[0];
        comicsService.prepForBroadcast($scope.data.comics.collectionURI);
    });
}]);

app.controller('comicsController', ['$scope', '$http', 'comicsService', function($scope, $http, comicsService) {
    $scope.data = {};
    $scope.foo = 'foo';
    $scope.$on('handleBroadcast', function() {
        $scope.comicsURI = comicsService.comicsURI;
        $scope.requestComics();
    });

    $scope.requestComics = function() {
        $http({
            method: 'GET',
            url: $scope.comicsURI+'?apikey='+MARVEL_API_KEY
        }).
        success(function(data, status, headers, config) {
            $scope.data = data.data.results;
        });
    }
}]);
