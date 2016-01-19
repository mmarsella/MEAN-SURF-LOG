1/16/2016

            _________
    -------| BUG LOG |--------
            ---------

/** BOWER COMPONENTS***/

Error:  Uncaught SyntaxError: Unexpected token <

Context:  Including script tags in my index.html like so:  

 <script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>

 Where bower components was at the highest level of my app.  When I moved it inside of my js file and ref like so: 

  <script type="text/javascript" src="./js/bower_components/jquery/dist/jquery.js"></script>

  It worked!

  Question:  Does this have to do with the:

  app.use('/js',express.static(path.join(__dirname, '../client/js')));  \_ Which is defined in my app.js on my server????

  Status:  RESOLVED


  ------------------------------------------------------

  /*** RESOLVES IN ROUTER ***/

  ERROR:  Injector module ....

  Context:  Trying to pass currentUser's id through $auth.getPayload().user._id within a getLogs resolve to gain access to ONLY logs that the user owns.  $auth is not recognized in the injections.

  Possible solutions:  I can either move the getLogs() resolve into the mainController and then I would have access to the user._id.  

  OR 

  Try to add the $auth.getPayload() into the resolves before calling the getLog() to have access to the user....  pro's v con's???


  Sunday 8:45pm:

  Still can't send over currentUser to my server through my getLogs Service.... 

  RESOLVED:  

  In services:

  changed -->       return $http.get('/api/log',user)\

  to

  return $http.POST('/api/log',user)

  Changing it to a POST request allows me to send/gain access to req.body on the server... 

  Question:  Do GET requests normally not have req.bodys???? 

  NOTE:  Log.js cannot follow RESTful routing due to this work around...


  TO DO:


  FOR TUESDAY:  GET CREATE LOG TO LINK TO db.forecast.find.  

  --> Everything is in the create log, just need to handle asynchronous behavior.
  



 <!--  1) Get bootstrap to work with fullCalendar
  \__ ui-bootstrap vs. reg bootstrap?
  \___ Custom directives... -->

 <!--  2) Create API Button to make call to populate 
     forecast db w/ 24 hours of current day forecast. -->

     FOR TOMORROW --> SUNDAY

  3)  Modify Log create to pull from forecast db.
  \___  Should match date, time and location --> within a 3 hour range.


  4)  Event Clicks w/ fullCalendar
  \___ Show Page is on event click
    \___ FULL CRUD in Show Page


  5) A user has many logs.  When a user goes to their dash, populate the user's logs onto the calendar.

  -->  START STYLING HERE

  BONUS:  When user clicks a non-event area, prompts to create log.

  5)  Get current Forecast to work

  6)  Chart.js

  7a)  User ACCOUNT
  \___ Link social media
  \___ Edit Account settings
  \___ Add pic with upload care

  7)  Follow friends

  8)  View friend stats

  9)  Web Sockets Chat



/**** SPOT ID's*****/
____________________
NORTHERN CALIFORNIA|
--------------------
Bolinas --> 4221
Bolinas Jetty--> 4215
Eureka --> 302
Klamath River --> 299
Linda Mar / Pacifica --> 819
Marin County --> 307
Moonstone beach --> 301
Ocean Beach - 255
Patricks Point --> 300
Point Arena --> 304
Salmon Creek --> 306
Secrets --> 305
Shelter Cove --> 4083
South Beach --> 298
Stinson beach --> 4216
Virgin Creek --> 303
____________________
CENTRAL CALIFORNIA  |
---------------------

Andrew Molera State Park --> 260
Cambria --> 261
Carmel Beach --> 666
Cayucos --> 866
Davenport Landing --> 256
Four Mile --> 257
Ghost Trees --> 825
Manresa Beach --> 258
Mavericks (Half Moon Bay) --> 162
Monterey Bay Offshore --> 3734
Morro Bay --> 262
Moss Landing --> 259
Oceano/Pismo --> 264
Pico Creek --> 4423
Pleasure Point --> 644
Princeton Jetty --> 3679
Saint Annes --> 263
Sand Dollar Beach --> 4422
Steamer Lane --> 163
Waddell Creek --> 3742


