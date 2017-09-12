angular.module('root.account', ['ngRoute', 'xeditable'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/:userId', {
    templateUrl: '/javascript/viewAccount/account.html',
    controller: 'accountCtrl'
  });
}])

.controller('accountCtrl', ["$scope", "$routeParams", "$rootScope", "$filter", "$window", function($scope, $routeParams, $rootScope, $filter, $window) {
    $rootScope.isHomeView = false;
    $scope.dogName = '';
    $scope.showEditBtn = false;
    $scope.dogNameExist = true;

    //editable tagline
    $scope.quote = {
        text: '',
        color: ''
    };

    //editable about
    $scope.about = {
        text: ''
    };

    //gender
    $scope.gender = {
        status: 0
      };
      $scope.genders = [
        {value: 1, text: 'female'},
        {value: 2, text: 'male'}
      ];
      $scope.showSelectedGender = function() {
        var selectedGender = $filter('filter')($scope.genders, {value: $scope.gender.status});
        return ($scope.gender.status && selectedGender.length) ? selectedGender[0].text : 'Gender';
      };
      $scope.age = {
        range: ''
      };

      //color
      $scope.dogName = {
        name: '',
        color: '',
        location: '',
        font: 'Kanit'
      };
       $scope.fonts = [
          {value: 'Kanit', text: 'Kanit'},
          {value: 'Cinzel', text: 'Cinzel'},
          {value: 'Quicksand', text: 'Quicksand'},
          {value: 'Luckiest Guy', text: 'Luckiest Guy'}
        ];
        $scope.showSelectedFont = function() {
          var selectedFont = $filter('filter')($scope.fonts, {value: $scope.dogName.font});
          return ($scope.dogName.font && selectedFont.length) ? selectedFont[0].text : 'Not set';
        };


    //Read from database
    firebase.database().ref('/user/' + $routeParams.userId).once('value').then(function(user) {
        $scope.$apply(function(){
            $scope.dogName.name = user.val().dogname;
            $scope.quote.text = user.val().tagline;
            $scope.about.text = user.val().about;
            $scope.gender.status = user.val().gender;
            $scope.age.range = user.val().age;
            $scope.dogName.color = user.val().dogNameColor;
            $scope.quote.color = user.val().taglineColor;
            $scope.dogName.font = user.val().dogNameFont;
            $scope.bgpic = user.val().bgpic;
            $scope.dogName.location = user.val().dogNameLocation;

            if ($scope.dogName.name === '') {
                $scope.dogNameExist = false;
            }
        });
    });

    //Write to database
    $scope.saveActInfo = function() {
        firebase.database().ref('/user/' + $routeParams.userId).update({
            tagline: $scope.quote.text,
            about: $scope.about.text,
            gender: $scope.gender.status,
            age: $scope.age.range,
            dogNameColor: $scope.dogName.color,
            taglineColor: $scope.quote.color,
            dogNameFont: $scope.dogName.font,
            bgpic: $scope.bgpic,
            dogNameLocation: $scope.dogName.location
        });
    }

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
                if (uid === $routeParams.userId) {
                    $scope.showEditBtn = true;
                } else {
                    $scope.showEditBtn = false;
                }
              } else {
                    $scope.showEditBtn = false;
                // User is signed out.
                // ...
              }
            });
        });

    //updates dog name to database if they didn't include one
    $scope.updateDogName = function() {
        firebase.database().ref('/user/' + $routeParams.userId).update({
            dogname: $scope.dogName.name,
            bgpic: '/madisonpics/dogs2.jpg'
        });
        location.reload();
    };

}]);
