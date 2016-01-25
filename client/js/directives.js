
app.directive('modal', function () {
    return {
      templateUrl: "templates/show.html",
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });


        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

app.directive('addLogForm',function(){
  return{
    templateUrl:'templates/addLogForm.html',
    // restrict: 'E',
    // replace: true,
  
    controller: function($scope,LogService,$auth){
    // console.log("User", $scope.currentUser);

        $scope.rate = 5;
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.addDescription = false;

        $scope.hoveringOver = function(value) {
          $scope.overStar = value;
          $scope.percent = 100 * (value / $scope.max);
        };

        // $scope.ratingStates = [
        //   {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        //   {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        //   {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        //   {stateOn: 'glyphicon-heart'},
        //   {stateOff: 'glyphicon-off'}
        // ];



       var date = new Date();
       var y = date.getFullYear();    // Use the current year when adding log
    

        function addCalendarEvent(log){
            // console.log("INSIDE addCal for dir",log)
            var obj = {};
            obj._id = log._id;
            obj.title = log.spot_name;
            obj.start = new Date(y, log.numMonth, log.numDate, log.hour, log.minutes),    
            obj.color = "red";
            $scope.events.push(obj);
        }

    console.log("logs in directive", $scope.logs);
    $scope.addLog = function(log){

      log.user = $scope.currentUser._id;
      // console.log("USER INSIDE ADD LOG", $scope.currentUser._id);
      // console.log("INSIDE ADD LOG", log);
      LogService.createLog(log).then(function(log){
        // console.log("SUCCESS");
        $scope.logs.push(log);  // updates the logs on page w/o refresh!
         addCalendarEvent(log);
        $scope.newLog = {};
        $scope.postForm.$setPristine(); // clears form
        $scope.isCollapsed = !$scope.isCollapsed;
        console.log("locOBJ after add", $scope.locObj)
        // $scope.addFormVisible = !$scope.addFormVisible;
      });
    }
  },  // end Controller
 }
}); //end logForm


app.directive('signUp',function(){
  return{
    templateUrl:'templates/signup.html',
    controller: function($scope, $location, $auth, UserService) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/home');
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
}
    // restrict: 'E',
    // replace: true,
 }
}); //end signUp


// app.controller('SignupController', function($scope, $location, $auth, UserService) {
//     $scope.signup = function() {
//       $auth.signup($scope.user)
//         .then(function(response) {
//           $auth.setToken(response);
//           $location.path('/');
//           console.log('You have successfully created a new account and have been signed-in');
//         })
//         .catch(function(response) {
//           console.log(response);
//         });
//     };
//     $scope.authenticate = function(provider) {
//       $auth.authenticate(provider)
//         .then(function(res) {
//           console.log('You have successfully signed in with ' + provider + '!');
//           $location.path('/home');
//         })
//         .catch(function(error) {
//           if (error.error) {
//             // Popup error - invalid redirect_uri, pressed cancel button, etc.
//             console.log(error.error);
//           } else if (error.data) {
//             // HTTP response error from server
//             console.log(error.data.message, error.status);
//           } else {
//             console.log(error);
//           }
//         });
//     };
// });



