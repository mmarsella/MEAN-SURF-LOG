app.service("UserService", function($http, $window){
  return {
    signup: function(user){
      return $http.post('/api/auth/signup',user);
    },
    login: function(user){
      return $http.post('/api/users/login',user);
    },
    setCurrentUser: function(data){
      $window.localStorage.setItem("token",data.data.token);
      $window.localStorage.setItem("user",JSON.stringify(data.data.user));
    },
    getCurrentUser: function(){
      return JSON.parse($window.localStorage.getItem("user"));
    },
    logout: function(){
    $window.localStorage.clear();
    },
    getAllUsers: function(){
      return $http.get("/api/users/");
    },
    getSingleUser: function(id){
      return $http.get("/api/users/" + id);
    },
    editUser: function(user){
      return $http.put("/api/users/" + user.id, user);
    },
    removeUser: function(user){
      return $http.delete("/api/users/" + user.id);
    }
  }
});

app.service("ForecastService", function($http){
  return {
    getForecast: function(){
      // console.log("INSIDE FORECAST SERVICE");
      return $http.get('/api/forecast/retrieve');
    }
  }
});

app.service("LogService", function($http,$auth){
  return{
    createLog: function(log){
      console.log("LOGSERVICE BEFORE",log);
      //req.body = log
      return $http.post('/api/log',log).then(function(resp){
        console.log("LOGSERVICE:",resp);
        return resp.data;
      })
    },
    getLogs: function(){
      // UNABLE TO SEND OVER AS req.body!  Always results in {}
      user = $auth.getPayload().user;
      console.log("INSIDE GET LOGS SERVICE", user);
      return $http.get('/api/log',user).then(function(resp){
        console.log("RESP DATA:",resp.data);
        return resp.data;
      });
    }
  }
});
