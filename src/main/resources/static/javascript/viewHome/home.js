angular.module('root.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/javascript/viewHome/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ["$scope", "$timeout", function($scope, $timeout) {
    $scope.isSlide1 = true;
    $scope.isSlide2 = true;
    $scope.isSlide3 = true;
    $scope.fadeOut = false;
    $scope.fadeIn = false;

    $scope.yesSelected = function () {
        $scope.fadeOut = true;
        //$scope.isSlide2 = true;
        $scope.isSlide2=true;
        $scope.isSlide1=false;

    };
}]);