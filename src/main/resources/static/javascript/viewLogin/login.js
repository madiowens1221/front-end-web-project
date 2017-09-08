angular.module('root.login', ['ngRoute'])

//configuration for the route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/javascript/viewLogin/login.html',
    controller: 'loginCtrl'
  });
}])


.controller('loginCtrl', ["$scope", "$window", "$rootScope", function($scope, $window, $rootScope) {
    //variables
    $scope.email = "";
    $scope.password = "";
    $scope.verifyPassword = "";
    $scope.name = "";
    $scope.dogName = "";
    $scope.signinError;

    //provider for google login
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    //nav and footer
    $rootScope.isHomeView = false;

    //verify email
    $scope.isEmailValid = function() {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        //if string is true
        if ($scope.email == "") {
            return "";
        }
        else if (String($scope.email).search (filter) != -1) {
            return "valid";
        }
        else {
            return "invalid";
        }
    };

    //verify password green text
    $scope.focused = false;
    $scope.open= false;
    $scope.isPasswordValid = function(){
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

    //verify passwords match
    $scope.isPasswordVerify = function() {
        if ($scope.verifyPassword == "") {
            return "";
        }
        else if ($scope.password === $scope.verifyPassword) {
            return "valid";
        }
        else {
            return "invalid";
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
        if ($scope.buttonText === "sign in" && $scope.isPasswordValid() === "valid" && $scope.isEmailValid() === "valid") {
        //log in
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(user){
                $window.location.href = '#/account';
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $scope.$apply(function(){
                    $scope.signinError = error.message;
                })
            });
        }
        //creating account
        else if ($scope.isPasswordValid() === "valid" && $scope.isEmailValid() === "valid" && $scope.isPasswordVerify() === "valid") {
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function(user){
                //Write to database
                console.log($scope.name);
                console.log($scope.dogName);
                console.log("hello");
                firebase.database().ref('/user/' + user.uid).set({
                    username: $scope.name,
                    dogname: $scope.dogName,
                    about: 'Write a short summary about your dog!',
                    age: '0',
                    gender: '0',
                    tagline: 'Your dogs favorite one-liner here!',
                    bgpic: '/madisonpics/dogs.jpg'
                });
                //take to account page
                $window.location.href = '#/account/' + user.uid;

                console.log(user.uid);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $scope.$apply(function(){
                    $scope.signinError = error.message;
                })
            });
        }
        //error with signing in or creating account
         else {
         console.log("error");
         console.log($scope.isPasswordValid());
         console.log($scope.isEmailValid());
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

