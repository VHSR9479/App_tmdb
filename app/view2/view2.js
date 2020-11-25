'use strict';

angular.module('myApp.view2', ['ngRoute','ngPagination','ngAnimate'])
// =====INICIO COMENTARIO=======================
// || DEV: Victor Salazar                      || 
// || FECHA: 22-11-20                          ||
// || DESCRIPCION:Servicio para elcosumo de api||
// =============================================
.service('apiServicio',function($http){
 // -------Variables necesarias para el consumo de las Api's------
  this.imageUrl="http://image.tmdb.org/t/p/w154/"
  this.url="https://api.themoviedb.org/3/";
  this.api_key="19ada6bce5375922d7711c34dbe11ca5";

// --------Metodos para el consumo de Api de peliculas------------
  this.getAllPelicula=function(filtro){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'search/movie?api_key='+this.api_key+'&query='+filtro
        }
      )
    return retorno;
  }

  this.getPelicula=function(id){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'movie/'+id+'?api_key='+this.api_key+'&language=en-US'
        }
      )
    return retorno;
  }  
// --------Metodos para el consumo de Api de Series de TV-------------
  this.getAllSerie=function(filtro){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'search/tv?api_key='+this.api_key+'&query='+filtro
        }
      )
    return retorno;
  }  

  this.getSerie=function(id){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'tv/'+id+'?api_key='+this.api_key+'&language=en-US'
        }
      )
    return retorno;
  }  
// ------------Metodos para el consumo de Api de personajes------------
  this.getAllPersonaje=function(filtro){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'search/person?api_key='+this.api_key+'&query='+filtro
        }
      )
    return retorno;
  }  

  this.getPersonaje=function(id){   
    var retorno = $http(
        {
          method:'GET',
          url:this.url+'person/'+id+'?api_key='+this.api_key+'&language=en-US'
        }
      )
    return retorno;
  }  
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
//=====FIN COMENTARIO======================= 

// =====INICIO COMENTARIO=======================
// || DEV: Victor Salazar                      || 
// || FECHA: 22-11-20                          ||
// || DESCRIPCION:Contolador para el manejo    ||
// || de info ente el sericio y la vista       ||
// =============================================
.controller('View2Ctrl', function($scope,apiServicio) {
// ---------Variables necesarias ---------------
  $scope.peliculas=[];
  $scope.series=[];
  $scope.personajes=[];
  $scope.descripcion=[]; 

  $scope.filtro ="";

  $scope.ViewPer=false;
  $scope.visualizar= false;
  $scope.visualizar2= false;
  $scope.visualizar3= false;

  $scope.image= apiServicio.imageUrl;

// ---------Metodo para el el evento KEY UP de la caja de texto ---------------
  $scope.eventKeyUp = function (){
    getAllPelicula();
    getAllSerie();
    getAllPersonaje();
  }
// ---------Metodo para infromacion  del modal ("Descripcion de la pelicula") ---------------
 $scope.descripcionModal =function (id,pref){
   $scope.ViewPer=false;
   if(pref=='P'){
    this.getPelicula(id);
   }else if(pref=='S'){
    this.getSerie(id);
   }else if(pref=='O'){
    $scope.ViewPer=true;
    this.getPersonaje(id);
   }
 }

//-------------- Metodos para la gestion de peliculas-------------
  $scope.getPelicula = function (id){
    var respuesta=apiServicio.getPelicula(id);
    respuesta.then(
      function successCallback(response) {    
        console.log(response.data);    
        $scope.descripcion =response.data;
      }, 
      function errorCallback(reason) {
        alert( "error");
      }
    );
  }

  function getAllPelicula(){
    var respuesta=apiServicio.getAllPelicula($scope.filtro);
    respuesta.then(
      function successCallback(response) {    
        $scope.visualizar=true;
        $scope.peliculas =response.data.results;       
      }, 
      function errorCallback(reason) {
        $scope.peliculas = [];
        $scope.visualizar=false;
      }
    );
  }

  // -----------------Metodos para la gestion de Series----------------
  function getAllSerie(){
    var respuesta=apiServicio.getAllSerie($scope.filtro);
    respuesta.then(
      function successCallback(response) {   
        $scope.visualizar2=true;
        $scope.series =response.data.results;       
      }, 
      function errorCallback(reason) {
        $scope.series = [];
        $scope.visualizar2=false;
      }
    );
  }

  $scope.getSerie = function (id){
    
    var respuesta=apiServicio.getSerie(id);
    respuesta.then(
      function successCallback(response) {    
        console.log(response.data);    
        $scope.descripcion =response.data;
      }, 
      function errorCallback(reason) {
        alert( "error");
      }
    );
  }

  // ------------Metodos para la gestion de Personajes-------------

  function getAllPersonaje(){
    var respuesta=apiServicio.getAllPersonaje($scope.filtro);
    respuesta.then(
      function successCallback(response) {   
        $scope.visualizar3=true;
        $scope.personajes =response.data.results;       
      }, 
      function errorCallback(reason) {
        $scope.personajes = [];
        $scope.visualizar3=false;
      }
    );
  }

  $scope.getPersonaje = function (id){
    
    var respuesta=apiServicio.getPersonaje(id);
    respuesta.then(
      function successCallback(response) {    
        console.log(response.data);    
        $scope.descripcion =response.data;
      }, 
      function errorCallback(reason) {
        alert( "error");
      }
    );
  }
});
//=====FIN COMENTARIO======================= 