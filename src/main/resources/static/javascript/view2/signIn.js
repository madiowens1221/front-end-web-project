angular.module('root.signIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signIn', {
    templateUrl: '/javascript/view2/signIn.html',
    controller: 'signInCtrl'
  });
}])

.controller('signInCtrl', [function() {

}]);