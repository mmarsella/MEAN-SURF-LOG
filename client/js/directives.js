
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

