angular.module('root.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questions', {
    templateUrl: '/javascript/viewFAQ/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = false;

}]);