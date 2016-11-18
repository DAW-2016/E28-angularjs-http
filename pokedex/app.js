var app = angular.module('pokedex', []);



app.factory('PokedexService', function($http){

  var pokedexService = {};

  pokedexService.getPokemons = function(callback) {
    $http.get('http://pokeapi.co/api/v1/pokedex/1/').then(function(response) {
      var answer = response.data.pokemon;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  pokedexService.getPokemonDescriptionById = function(id, callback) {
    $http.get('http://pokeapi.co/'+id).then(function(response) {
      var answer = {};
      answer.nome = response.data.name;
      answer.attack = response.data.attack;
      answer.defense = response.data.defense;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  return pokedexService;
});


app.controller('PokedexController', ['PokedexService', function(pokedexService){
  var self = this;
  self.pokemons = [];
  self.nome = "";
  self.attack = "";
  self.defense = "";

  pokedexService.getPokemons(function(answer) {
    if (answer !== null) {
      self.pokemons = answer;
    }
  });

  self.pegaDescricao = function(link){
    // var aux = link.split("/");
    console.log(link);
    pokedexService.getPokemonDescriptionById(link, function(answer){
      self.nome = answer.nome;
      self.attack = answer.attack;
      self.defense = answer.defense;
    });
  }


}]);
