angular.module('root.links', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/links', {
    templateUrl: '/javascript/viewLinks/links.html',
    controller: 'linksCtrl'
  });
}])

.controller('linksCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = false;

}]);