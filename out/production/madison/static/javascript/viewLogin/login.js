angular.module('root.login', ['ngRoute'])

//configuration for the route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/javascript/viewLogin/login.html',
    controller: 'loginCtrl'
  });
}])


.controller('loginCtrl', ["$scope", "$window", "$rootScope", function($scope, $window, $rootScope) {
    //
    $rootScope.isHomeView = false;

    //verify password
    $scope.focused = false;
    $scope.open= false;
    $scope.isValid = function(){
            return $scope.focused;
        };

    //changes text on login button
    $scope.signUp = function(){
        if ($scope.buttonText === "sign in") {
            $scope.buttonText = "create account";}
        else {
            $scope.buttonText = "sign in";}
    };
    $scope.buttonText = "sign in";

    $scope.email;
    $scope.password;
    $scope.verifyPassword;
    $scope.name;
    $scope.dogName;

    //creating a user
    $scope.createUserOrLogIn = function() {
        if ($scope.buttonText === "sign in") {
        //log in
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
        $window.location.href = '#/account';
        }
        else {
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      console.log(errorCode);
                      var errorMessage = error.message;
                      console.log(errorMessage);
                      // ...
                    });
            }
    }

}]);

