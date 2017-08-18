angular.module('root.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/javascript/viewHome/home.html',
    controller: 'homeCtrl'
  });
}])


.controller('homeCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = true;
}]);