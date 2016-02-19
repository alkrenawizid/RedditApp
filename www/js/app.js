(function(){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('reddit', ['ionic']);
var urlA = 'http://img.mako.co.il/2010/12/07/yeekk_c.jpg';
var urlB = 'http://img.mako.co.il/2008/05/27/01/iStock_000006143391XSmall_c.jpg';
var urlC = 'http://img.mako.co.il/2007/12/13/91/iStock_000003798853XS_c.jpg';
var urlD = 'http://msc.wcdn.co.il/w/w-300/234852-18.jpg';
var urlE = 'http://hahem.co.il/false/wp-content/uploads/2013/07/kid-reading-book.jpg';

var json =  [ 
{ id: 1, name: 'A', picture:urlA ,details: 'aaa'}, 
{ id: 2, name: 'B', picture:urlB ,details: 'bbb'}, 
{ id: 3, name: 'C', picture:urlC ,details: 'ccc'},
{ id: 4, name: 'D', picture:urlD ,details:'ddd' },
{ id: 5, name: 'E', picture:urlE ,details: 'eee'}];

 

app.controller('redditCtrl', function($http, $scope){

  $http.get('https://www.reddit.com/.json')
  .success(function(res){
      console.log(res.data.children);
      $scope.reddits = [];
      angular.forEach(res.data.children, function(child){
          $scope.reddits.push(child.data);
      });
  }).error(function(err){

  });
});

app.controller('detailsCtrl' ,function($scope, $state){
 var id = $state.params.id;
 for (var i = 0; i < json.length; i++) {
   if (json[i].id==id){
      $scope.children = json[i];
    }
 };
});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('list',  {
      url:'/list', 
      templateUrl:'templates/list.html'
    });

    $stateProvider.state('details',  {
    url:'/details/:id', 
    templateUrl:'templates/details.html'
  });

  $urlRouterProvider.otherwise('/list');
});








app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());