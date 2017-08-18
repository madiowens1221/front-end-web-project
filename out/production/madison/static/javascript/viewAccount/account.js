angular.module('root.account', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: '/javascript/viewAccount/account.html',
    controller: 'accountCtrl'
  });
}])

.controller('accountCtrl', ["$scope", function($scope) {

    firebase.auth().onAuthStateChanged(function(user) {
        $scope.$apply(function(){
          if (user) {
            console.log("user is logged in");
                console.log(user.email);
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
            console.log("user is logged out");
            // User is signed out.
            // ...
          }
        });
    });

}]);
