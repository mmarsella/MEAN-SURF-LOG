1/16/2016

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


  -----------------------------------------------------------------

  TO DO:

  1) Get bootstrap to work with fullCalendar
  \__ ui-bootstrap vs. reg bootstrap?
  \___ Custom directives...

  2) Create API Button to make call to populate 
     forecast db w/ 24 hours of current day forecast.

  3)  Modify Log create to pull from forecast db.

  4)  Event Clicks w/ fullCalendar
  \___ Show Page is on event click
    \___ FULL CRUD in Show Page

  -->  START STYLING HERE

  BONUS:  When user clicks a non-event area, prompts to create log.

  5)  Get current Forecast to work

  6)  Chart.js

  7)  Follow friends

  8)  View friend stats

  9)  Web Sockets Chat

