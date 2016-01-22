
// USER DASHBOARD
app.controller("MainController", function($scope,$auth,$compile,$timeout, uiCalendarConfig, ForecastService, LogService,logs){
  $scope.log = {};
  $scope.logs = logs;
  $scope.addFormVisible = false;
  $scope.isCollapsed = true;
  $scope.showModal = false;

  $scope.hourCount = 10;

  /****** CHART JS ********/


  //Line Chart

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 19, 86, 27, 90],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);


  //Pie Chart
  // loop through all of the logs in Calendar
  // assign locations to the data []


  $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data2 = [300, 500, 100];


  
  // Bar Chart
  $scope.labels3 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data3 = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];


/***********************************************/

  $scope.showAddForm = function(){
    $scope.addFormVisible = !$scope.addFormVisible;
  }


  $scope.apiCall = function(){
    // An $http service returns a promise. --> then handles the data inside the promise the data in the callback is what has been resolved and returned from the API
    ForecastService.getForecast().then(function(resp){
      $scope.forecast = resp;
    });
  }


  // $auth.getPayload() --> Returns a JWT Claims Set, i.e. the middle part of a JSON Web Token.
  $scope.currentUser = $auth.getPayload().user;

  // $scope.addLog = function(log){

  //   log.user = $scope.currentUser._id;

  //   console.log("USER INSIDE ADD LOG", $scope.currentUser._id);
  //   console.log("INSIDE ADD LOG", log);
  //   LogService.createLog(log).then(function(log){
  //     console.log("SUCCESS");
  //     $scope.logs.push(log);  // updates the logs on page w/o refresh!
  //      addCalendarEvent(log);
  //     $scope.log = {};
  //   });
  // }

  $scope.removeLog = function(log){
    LogService.removeLog(log).then(function(log){
      $scope.removeEvent(log);  // remove from calendar
       for(var i=0; i < $scope.logs.length; i++){
        if(log._id === $scope.logs[i]._id){
          $scope.logs.splice(i,1);
          console.log("Logs after removal",$scope.logs);
        }
      }
    })
  }

/*___________________________________________
************** FULL CALENDAR ****************
--------------------------------------------*/

$scope.calendarVisible = true;


// console.log("First Log",$scope.logs[0])
// console.log("Location: ", $scope.logs[0].spot_name);
// console.log("numDate: ", $scope.logs[0].numDate);
// console.log("numMonth: ", $scope.logs[0].numMonth);
// console.log("Hour: ", $scope.logs[0].hour);
// console.log("Year: ", 2016);

    var date = new Date();
    var d = date.getDate();
    console.log("D", d);
    var m = date.getMonth();
    console.log("m",m);
    var y = date.getFullYear();    // Use the current year when adding log
    console.log("y",y);


    /* event source that pulls from google.com */
    // $scope.eventSources = {
    //         url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
    //         className: 'gcal-event',           // an option!
    //         currentTimezone: 'America/Chicago' // an option!
    // };



    /* event source that contains custom events on the scope */
    $scope.events = [
      // {title: $scope.logs[0].spot_name, start: new Date(y,$scope.logs[0].numMonth,$scope.logs[0].numDate), color:"red"},
      // {title: 'All Day Event',start: new Date(y, m, 1)},
      // {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      // {id: 999,title: 'Repeating Event',start: new Date(y, m, d , 16, 0),allDay: false},
      // {id: 999,title: 'Repeating Event',start: new Date(y, m, d , 16, 0),allDay: false},
      // {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];

    
        if($scope.logs){
          for(var i=0; i<$scope.logs.length; i++){
            var obj = {};
            obj._id = $scope.logs[i]._id;
            obj.title = $scope.logs[i].spot_name;
            obj.start = new Date(y, $scope.logs[i].numMonth, $scope.logs[i].numDate, $scope.logs[i].hour, $scope.logs[i].minutes),
            
            obj.color = "blue";
            $scope.events.push(obj);
          }
        }      
    
      console.log("LOGS",$scope.logs);


        // function addCalendarEvent(log){
        //     var obj = {};
        //     obj.title = log.spot_name;
        //     obj.start = new Date(y, log.numMonth, log.numDate, log.hour, log.minutes),
            
        //       obj.color = "blue";
        //     $scope.events.push(obj);

        // }


          /* remove event */
    $scope.removeEvent = function(event){
      for(var i=0; i < $scope.events.length; i++){
        if(event._id === $scope.events[i]._id){
          $scope.events.splice(i,1);
        }
      }
    };

    /* event source that calls a function on every view switch */
    // $scope.eventsF = function (start, end, timezone, callback) {
    //   var s = new Date(start).getTime() / 1000;
    //   var e = new Date(end).getTime() / 1000;
    //   var m = new Date(start).getMonth();
    //   var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    //   callback(events);
    // };

    // $scope.calEventsExt = {
    //    color: '#f00',
    //    textColor: 'yellow',
    //    events: [
    //       {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
    //       {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
    //       {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    //     ]
    // };



    //onEventClick

    /*
      Should make a call to get an indiv log....

    */



    /* alert on eventClick */
    $scope.onEventClick = function( date, jsEvent, view){
      $scope.log = {};
      // date is the eventObject

        console.log("date",date);
        console.log("jsEvent",jsEvent);
        console.log("view",view);

        //Find log from event, set it to $scope.log
        for(var i=0; i < $scope.logs.length; i++){
          if($scope.logs[i]._id === date._id){
            $scope.log = $scope.logs[i];
          }
        }

        
        $scope.showModal = !$scope.showModal;


        console.log("Weather condition",$scope.log.forecast.condition.weather);





       

        /*********** MSW STAR RATING SYSTEM!!!! ********************/
        var rating = [];
        // Loop the solid rating on a single forecast object.
        for (var i = 0; i < $scope.log.forecast.solidRating; i++) {
            rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
        }
        // Loop the faded rating on a single forecast object.
        for (var i = 0; i < $scope.log.forecast.fadedRating; i++) {
            rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');
        }
        document.getElementById("ratingContainer").innerHTML = rating.join(" ");
        /********************************************************************************/

    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    // $scope.addEvent = function() {
    //   $scope.events.push({
    //     title: 'Open Sesame',
    //     start: new Date(y, m, 28),
    //     end: new Date(y, m, 29),
    //     className: ['openSesame']
    //   });
    // };









  
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    // $scope.renderCalender = function(calendar) {
    //   $timeout(function() {
    //     if(uiCalendarConfig.calendars[calendar]){
    //       uiCalendarConfig.calendars[calendar].fullCalendar('render');
    //     }
    //   });
    // };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.onEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    /* event sources array*/
    // $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.events];

  /********** END CALENDAR ****************/

});  // END CONTROLLER


app.controller("LoginController", function($scope, $auth, $location, UserService){
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