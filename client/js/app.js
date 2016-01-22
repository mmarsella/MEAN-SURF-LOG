var app = angular.module("surfLog", ['ngRoute','satellizer','ui.calendar',"ngAnimate",'ui.bootstrap','chart.js']);

// Config takes in providers.  $auth isn't a provider!
app.config(function($routeProvider, $locationProvider, $authProvider, ChartJsProvider){
  
  // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: false
    });

    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });

  $routeProvider
  .when('/home', {
    controller: "MainController",
    templateUrl: "templates/index.html",
    // if promise is resolves, do all this,
    // if rejected, go to .otherwise
    resolve: {
        logs: function(LogService,$q,$auth){
          return getCurrentUser($q,$auth).then(function(user){
            return LogService.getLogs(user);
          })
        },
      loginRequired: loginRequired
    }
  })
  .when('/', {
    controller: "LoginController",
    templateUrl: "templates/login.html",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn,
    }
  })
  .when('/signup', {
    controller: "SignupController",
    templateUrl: "templates/signup.html",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .when('/logout', {
    template: null,
    controller: 'LogoutController'
  })
  .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode(true);

  $authProvider.facebook({
    clientId: '1504124496560784',
    url: '/api/auth/facebook'
  });

  $authProvider.loginUrl = 'api/auth/login';
  $authProvider.signupUrl = 'api/auth/signup';

  //$auth comes from satellizer
  // handles login/logout etc....


// THESE HANDLE $auth checking

  function skipIfLoggedIn($q, $auth, $location) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        $location.path('/home');
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/');
      }
      return deferred.promise;
    }

    // Need to send back a promise to resolve.... use $q to handle promises
    function getCurrentUser($q, $auth){
      var deferred = $q.defer(); // Creates a promise
      var user = $auth.getPayload().user;
      if(user){
        deferred.resolve(user); // sends back a user wrapped with a promise with a status of resolved
      }else{
        console.log("USER WAS NOT FOUND!");
        deferred.reject(); // sends back with status of rejected
      }
      return deferred.promise; 
    }
});




