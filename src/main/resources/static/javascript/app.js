angular.module('root', [
  'ngRoute',
  'root.login',
  'root.about',
  'root.account',
  'root.dashboard',
  'root.home',
  'root.questions',
  'root.links'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/home'});
}]).

controller( 'indexCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.buttonText2 = "loading!";

    $scope.buttonText = "loading!";

    firebase.auth().onAuthStateChanged(function(user) {
    $scope.$apply( function() {
        if (user) {
            $scope.buttonText = "paws out";
            $scope.buttonText2 = "sign out";
            console.log("should say paws out");
            // User is signed in.
        } else {
            $scope.buttonText = "paws in";
            $scope.buttonText2 = "sign in";
            console.log("should say paws in");

            // No user is signed in.
            }
        });
    });

    $scope.logInOrOut = function() {
        if ($scope.buttonText === "paws in") {
            $window.location.href = '#/login';
            console.log("should redirect");
        }
        if ($scope.buttonText === "paws out") {
            console.log("log out");
            firebase.auth().signOut().then(function() {
              // Sign-out successful.
              console.log("successfully signed out");
            }).catch(function(error) {
              // An error happened.
              console.log(error);
            });
            $window.location.href = '#/home';
        }
    };



//    FOOTER BUTTON
    firebase.auth().onAuthStateChanged(function(user) {
        $scope.$apply( function() {
            if (user) {
                $scope.buttonText2 = "sign out";
                console.log("should say sign out");
                // User is signed in.
            } else {
                $scope.buttonText2 = "sign in";
                console.log("should say sign in");
                // No user is signed in.
                }
            });
        });
    $scope.logInOrOutFooter = function() {
        if ($scope.buttonText2 === "sign in") {
            $window.location.href = '#/login';
            console.log("should redirect");
        }
        if ($scope.buttonText2 === "sign out") {
            console.log("log out");
            firebase.auth().signOut().then(function() {
              // Sign-out successful.
              console.log("successfully signed out");
            }).catch(function(error) {
              // An error happened.
              console.log(error);
            });
            $window.location.href = '#/home';
        }
    };

}]);



// ===== Scroll to Top ====
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});