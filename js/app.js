'use strict';

var app = angular.module('marvelApp', ['ngAnimate', 'ngResource']);

app.controller("characterController", ['$scope', '$resource', function($scope, $resource) {
    var characters = $resource('http://gateway.marvel.com:80/v1/public/:entity/:id/:collection',
        {entity:'characters', apikey:MARVEL_API_KEY});

    // get characters list
    $scope.charactersResult = characters.get(function() {
        // get first character id from result
        var defaultCharacterId = $scope.charactersResult.data.results[0].id;
        $scope.getCharacterInfo(defaultCharacterId);
    });

    $scope.getCharacterInfo = function(id) {
        var characterInfoResult = characters.get({id: id}, function() {
            $scope.characterInfo = characterInfoResult.data.results[0];
            $scope.getCharacterComics(id);
        });
    };

    $scope.getCharacterComics = function(id) {
        var comicsResult = characters.get({id:id, collection:'comics'}, function() {
            $scope.characterComics = comicsResult.data.results;
            $scope.comicCount = comicsResult.data.count;
        });
    }
}]);