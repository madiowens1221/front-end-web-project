angular.module('root.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/javascript/viewHome/home.html',
    controller: 'homeCtrl'
  });
}])


.controller('homeCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.isHomeView = true;

    //animations for slides
    var carouselContainer = $('.carousel');
    var slideInterval = 0;

    function toggleCaption() {
        $('.carousel-caption').hide();
        var caption = carouselContainer.find('.active').find('.carousel-caption');
        caption.delay(500).toggle("slide", {direction:'right'});
    }



}]);