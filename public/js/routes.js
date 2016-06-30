function routes($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController',
			resolve: {
				connected: checkIsConnected
			}
		})
		.when('/about', {
			templateUrl: 'views/about.html'
		})
    .when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
    })
		.when('/signup', {
			 templateUrl: 'views/signup.html',
			 controller: 'signupController'
	 })

		.otherwise({
			redirectTo: '/'
		});
		$httpProvider.interceptors.push(function ($q, $location, $rootScope) { //$q = permet de creer une promesse
			//$location = rediriger vers une page précise
   return {
       'request': function (config) { //config en paramétre
           config.headers = config.headers || {};
           if ($rootScope.token) {
               config.headers.authorization = $rootScope.token;
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) { // || = edo
               $location.path('/');
           }
           return $q.reject(response);
       }
   };
});
}
