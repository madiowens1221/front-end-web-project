angular.module('root.account', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/:userId', {
    templateUrl: '/javascript/viewAccount/account.html',
    controller: 'accountCtrl'
  });
}])

.controller('accountCtrl', ["$scope", "$routeParams", function($scope, $routeParams) {

//Write to database
//firebase.database().ref('/user/' + $routeParams.userId).set({
//    username: "paul"
//  });

//Read from database
//firebase.database().ref('/user/' + $routeParams.userId).once('value').then(function(snapshot) {
//    console.log((snapshot.val() && snapshot.val().username));
//  });


//get all users from database :D
//manipulate json objects in javascript
firebase.database().ref('/user/').once('value').then(function(snapshot) {
    console.log((snapshot.val()));
  });

//Determine if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        $scope.$apply(function(){
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            $scope.email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });
    });



}]);
