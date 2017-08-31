angular.module('root.login', ['ngRoute'])

//configuration for the route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/javascript/viewLogin/login.html',
    controller: 'loginCtrl'
  });
}])


.controller('loginCtrl', ["$scope", "$window", "$rootScope", function($scope, $window, $rootScope) {
    $scope.email = "";
    $scope.password = "";
    $scope.verifyPassword = "";
    $scope.name = "";
    $scope.dogName = "";
    //provider for google login
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    //nav and footer
    $rootScope.isHomeView = false;

    //verify email
    $scope.isEmailValid = function() {
        firebase.auth().fetchProvidersForEmail($scope.email).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        });
    }

    //verify password green text
    $scope.focused = false;
    $scope.open= false;
    $scope.isValid = function(){
        if ($scope.password.length == 0) {
            return "";
        }
        else if ($scope.password.length < 6) {
            return "invalid";
        }
        else {
            return "valid";
        }
    };

    //changes text on login button
    $scope.signUp = function(){
        if ($scope.buttonText === "sign in") {
            $scope.buttonText = "create account";
        }
        else {
            $scope.buttonText = "sign in";
        }
    };
    $scope.buttonText = "sign in";

    //creating a user AND logging in IF already a user (aka 'log in')
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

    //google
    $scope.googleLogin = function() {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          $window.location.href = '#/account';
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }

    //facebook
    $scope.facebookLogin = function() {
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          $window.location.href = '#/account';
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }

}]);

