angular.module('root.createUser', ['ngRoute'])

//configuration for the route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createUser', {
    templateUrl: '/javascript/view1/createUser.html',
    controller: 'createUserCtrl'
  });
}])


.controller('createUserCtrl', ["$scope", "$window", function($scope, $window) {
    $scope.focused = false;
    $scope.open= false;
    $scope.signUp = function(){
        if ($scope.open == true){
            $window.location.href = "#!/signIn";
         }
         $scope.open = true;
    };
    $scope.isValid = function(){
        return $scope.focused;
    };
}]);
