var app = angular.module("surfLog", ['ngRoute','satellizer']);

app.config(function($routeProvider, $locationProvider, $authProvider){
  $routeProvider
  .when('/home', {
    controller: "MainController",
    templateUrl: "templates/index.html",
    // if promise is resolves, do all this,
    // if rejected, go to .otherwise
    resolve: {
        logs: function(LogService){
        return LogService.getLogs();
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

// NOT CHECKING FOR LOCAL USER


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
});