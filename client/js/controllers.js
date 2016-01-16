app.controller("MainController", function($scope,$auth, ForecastService, LogService,logs){

  // $auth.getPayload()
  // Returns a JWT Claims Set, i.e. the middle part of a JSON Web Token.
  $scope.currentUser = $auth.getPayload().user;

  // An $http service returns a promise. --> then handles the data inside the promise
  // the data in the callback is what has been resolved and returned from the API
  ForecastService.getForecast().then(function(resp){
    $scope.forecast = resp;
  });

  $scope.log = {};
  $scope.logs = logs;
  console.log("CONTROLLER",$scope.logs);

  $scope.addLog = function(log){
    log.user = $scope.currentUser.id;
    console.log("INSIDE ADD LOG", log);
    LogService.createLog(log).then(function(log){
      console.log("SUCCESS");
      $scope.logs.push(log);  // updates the logs on page w/o refresh!
      $scope.log = {};
    });
  }
});

app.controller("LoginController", function($scope, $auth, $location, UserService){
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(res) {
        debugger
        console.log('You have successfully signed in with ' + provider + '!');
        $location.path('/home');
      })
      .catch(function(error) {
        if (error.error) {
          // Popup error - invalid redirect_uri, pressed cancel button, etc.
          console.log(error.error);
        } else if (error.data) {
          // HTTP response error from server
          console.log(error.data.message, error.status);
        } else {
          console.log(error);
        }
      });
  };

  $scope.login = function(user){
    $auth.login(user).then(function(data){
      UserService.setCurrentUser(data);
      $location.path('/home');
    }).catch(function(data){
      $scope.errors = data.data;
    });
  };
}); // end LoginController


app.controller('LogoutController', function($location, $auth) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        console.log('You have been logged out');
        $location.path('/');
      });
  });


app.controller('SignupController', function($scope, $location, $auth, UserService) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/');
          console.log('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          console.log(response);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          console.log('You have successfully signed in with ' + provider + '!');
          $location.path('/home');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            console.log(error.error);
          } else if (error.data) {
            // HTTP response error from server
            console.log(error.data.message, error.status);
          } else {
            console.log(error);
          }
        });
    };
});