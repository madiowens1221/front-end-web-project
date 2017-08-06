
angular.module('root', [
  'ngRoute',
  'root.createUser',
  'root.signIn'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/createUser'});
}]);
