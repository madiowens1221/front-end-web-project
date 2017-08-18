angular.module('root.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: '/javascript/viewAbout/about.html',
    controller: 'aboutCtrl'
  });
}])


.controller('aboutCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = false;

}]);
