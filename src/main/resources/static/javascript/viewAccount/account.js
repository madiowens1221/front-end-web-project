angular.module('root.account', ['ngRoute', 'xeditable'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/:userId', {
    templateUrl: '/javascript/viewAccount/account.html',
    controller: 'accountCtrl'
  });
}])

.controller('accountCtrl', ["$scope", "$routeParams", "$rootScope", "$filter", function($scope, $routeParams, $rootScope, $filter) {
    $rootScope.isHomeView = false;
    $scope.dogName = '';


    //editable text
    $scope.quote = {
        text: ''
    };
    $scope.about = {
        text: ''
    };
    //gender
    $scope.gender = {
        status: 0
      };
      $scope.statuses = [
        {value: 1, text: 'female'},
        {value: 2, text: 'male'}
      ];
      $scope.showStatus = function() {
        var selected = $filter('filter')($scope.statuses, {value: $scope.gender.status});
        return ($scope.gender.status && selected.length) ? selected[0].text : 'Gender';
      };
      $scope.age = {
        range: ''
      };



    //Read from database
    firebase.database().ref('/user/' + $routeParams.userId).once('value').then(function(user) {
        $scope.$apply(function(){
            $scope.dogName = user.val().dogname;
        });

//        console.log((user.val() && user.val().dogname));
    });

    //Write to database
    $scope.saveActInfo = function() {
//    console.log($scope.quote);
//    console.log($scope.about);
//    console.log($scope.gender);
//    console.log($scope.age);
//    console.log($scope.quote.text);
console.log("Inside Database Call");
        firebase.database().ref('/user/' + $routeParams.userId).update({
            tagline: $scope.quote.text,
            about: $scope.about.text,
            gender: $scope.gender.status,
            age: $scope.age.range
        });
    }




    //get all users from database :D
    //manipulate json objects in javascript
//    firebase.database().ref('/user/').once('value').then(function(snapshot) {
//        console.log((snapshot.val()));
//      });

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
