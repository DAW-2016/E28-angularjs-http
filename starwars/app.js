var app = angular.module('swapi', []);



app.factory('StardexService', function($http){

  var stardexService = {};

  stardexService.getPersonagens = function(pageID, callback) {
    $http.get('http://swapi.co/api/people/?page='+pageID).then(function(response) {
      var answer = response.data.results;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  stardexService.getPersonagemDescriptionByLink = function(link, callback) {
    $http.get(link).then(function(response) {
      var answer = {};
      answer.nome = response.data.name;
      answer.altura = response.data.height;
      answer.peso = response.data.mass;
      answer.sexo = response.data.gender;
      answer.dataDeNascimento = response.data.birth_year;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  return stardexService;
});


app.controller('StardexController', ['StardexService', function(stardexService){
  var self = this;
  self.personagens = [];
  self.nome = "";
  self.altura = "";
  self.peso = "";
  self.sexo = "";
  self.dataDeNascimento = "";


  for(var i = 1; i<= 9 ; i++){
    stardexService.getPersonagens(i, function(answer) {
      if (answer !== null) {
        self.personagens = self.personagens.concat(answer);
      }
    });
  }

  self.pegaDescricao = function(link){
    // var aux = link.split("/");
    stardexService.getPersonagemDescriptionByLink(link, function(answer){
      self.nome = answer.nome;
      self.altura = answer.altura;
      self.peso = answer.peso;
      self.sexo = answer.sexo;
      self.dataDeNascimento= answer.dataDeNascimento;
    });
  }


}]);
