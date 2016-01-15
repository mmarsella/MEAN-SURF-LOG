app.service("UserService", function($http, $window){
  return {
    signup: function(user){
      return $http.post('/api/users/signup',user);
    }





  }


});