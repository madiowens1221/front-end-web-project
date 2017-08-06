angular.module('root.login', ['ngRoute'])

//configuration for the route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/javascript/view1/login.html',
    controller: 'loginCtrl'
  });
}])


.controller('loginCtrl', ["$scope", "$window", function($scope, $window) {
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
