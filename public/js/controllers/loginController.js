function loginController ($rootScope, $scope, $location, loginService) {
  $scope.connect = function() {
    loginService.connect($scope.user).then(function(res){
      $rootScope.token = res.data.token;
      $rootScope.user = res.data.user;
      $location.path('/');
    }).catch(function(err){
      $rootScope.loginMessage.title = 'Bad login';
      $rootScope.loginMessage.message = ' Mauvais login ou mot de passe';
    });
  };

}
