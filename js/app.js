'use strict';

var app = angular.module('marvelApp', ['ngAnimate', 'ngResource']);

app.controller("eventsController", ['$scope', '$resource', function($scope, $resource) {
    var events = $resource('http://gateway.marvel.com:80/v1/public/:entity/:id/:collection',
        {entity:'events', apikey:MARVEL_API_KEY, orderBy:'name'});
    $scope.comicCount = 1;

    // get characters list
    $scope.eventsResult = events.get(function() {
        // get first character id from result
        var defaultId = $scope.eventsResult.data.results[0].id;
        $scope.getInfo(defaultId);
    });

    $scope.getInfo = function(id) {
        $scope.loadingContent = true;
        var infoResult = events.get({id: id}, function() {
            $scope.info = infoResult.data.results[0];
            $scope.getComics(id);
        });
    };

    $scope.getComics = function(id) {
        var comicsResult = events.get({id:id, collection:'comics', orderBy:''}, function() {
            $scope.loadingContent = false;
            $scope.comics = comicsResult.data.results;
            $scope.comicCount = comicsResult.data.count;
        });
    }
}]);