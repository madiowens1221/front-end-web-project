angular.module('root.explore', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/explore', {
    templateUrl: '/javascript/viewExplore/explore.html',
    controller: 'exploreCtrl'
  });
}])

.controller('exploreCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = false;
    $scope.users = '';
    $scope.result = [];

//    get all users from database :D
//    manipulate json objects in javascript
    firebase.database().ref('/user/').once('value').then(function(users) {
        $scope.$apply(function() {
            $scope.users = users.val();
            console.log($scope.users);

            for (var i in users.val()) {
                $scope.result.push([i, users.val()[i]]);
            }
            $scope.chunkedData = chunk($scope.result, 5);
        });
      });

    //turns json objects into array
    function chunk(r, size) {
        var array = [];
        for (var i=0; i<r.length; i+=size) {
            array.push(r.slice(i, i+size));
        }
        return array;
    }



}]);