angular.module('root.explore', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/explore', {
    templateUrl: '/javascript/viewExplore/explore.html',
    controller: 'exploreCtrl'
  });
}])

.controller('exploreCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = false;

}]);