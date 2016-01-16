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