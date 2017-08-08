angular.module('root', [
  'ngRoute',
  'root.login',
  'root.home'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);



