require("dotenv").load();

var express = require("express"),
    app = express(),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    path = require("path"),
    routes = require('./routes');
    auth = require("./middleware/auth");
    require("locus")


var request = require("request");
var db = require('./models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');

    var spots = {4221:"Bolinas",
             4215:"Bolinas Jetty", 
             302: "Eureka",
             299: "Klamath River",
             819: "Linda Mar/Pacifica",
             307: "Marin County",
             301: "Moonstone Beach",
             255: "Ocean Beach",
             300: "Patrick's Point",
             304: "Point Arena",
             306: "Salmon Creek",
             305: "Secrets",
             4083: "Shelter Cove",
             298: "South Beach",
             4216: "Stinson Beach",
             303: "Virgin Creek",
             //CEN-CAL SPOTS
             260: "Andrew Molera State Park",
             261: "Cambria",
             666: "Carmel Beach",
             866: "Cayucos",
             256: "Davenport Landing",
             257: "Four Mile",
             825: "Ghost Trees",
             258: "Manresa Beach",
             162: "Mavericks (Half Moon Bay)",
             3734:"Monterey Bay Offshore",
             262: "Morro Bay",
             259: "Moss Landing",
             264: "Oceano/Pismo",
             4423:"Pico Creek",
             644: "Pleasure Point",
             3679: "Princeton Jetty",
             263: "Saint Annes",
             4422: "Sand Dollar Beach",
             163: "Steamer Lane",
             3742: "Waddell Creek"
              };


var spot_ids = Object.keys(spots);

function spotName(spot_id){
    return spots[spot_id] || "Not a spot!";
}


// db.forecasts.findOne({spot_id:"4221",numDate:"23",localTimestamp:1453539600})


// var CronJob = require('cron').CronJob;
// new CronJob('0 */1 * * * *', function() {  
// var d = new Date(); 
// console.log("The time is...",d); 
//   // iter. thru all spots and create a forecast
//   for(var i=0; i < spot_ids.length; i++){
//     // close function (j) so I can immediately invoke it afterwards with i. Great example of scope and closure.
//     (function(j){
//       request.get("http://magicseaweed.com/api/"+process.env.MSW_KEY+"/forecast/?spot_id=" + spot_ids[j], function(err,resp,body){
          


//           var response = JSON.parse(body);
//           console.log("Doing forecast... ");
          
//           response.forEach(function(el){
//             var d = new Date(el.timestamp * 1000);

//             // db.Forecast.findOrCreate
//             // If same spot, date and time{  skip storing it into the database!  }
//             // eval(locus)
//             db.Forecast.findOne({spot_id:spot_ids[j], localTimestamp: el.localTimestamp, numDate: d.getDate()}, function(err, found){
//               console.log("INSIDE FIND ONE!", found);
//               if(!found){
//                   console.log("EL", el);
//                   var forecast = new db.Forecast(el);
//                   console.log("D",d);
//                   forecast.year = d.getYear();
//                   forecast.hour = d.getHours();
//                   forecast.numDate = d.getDate();
//                   forecast.numMonth = d.getMonth();
//                   forecast.spot_id = spot_ids[j];
//                   forecast.spot_name = spotName(spot_ids[j]);
//                   forecast.date = new Date(el.timestamp * 1000);
//                   forecast.save(function(err){
//                   if(err){
//                     console.log("ERROR IN SAVING!",err);
//                   }else{
//                     console.log("Succesfully SAVED");
//                   }
//                 }); //end Save
//                 console.log("SAVED");
//             }else{
//               console.log("IN THE DB!!!  SKIPPED!")
//             }
//            }); //end findOne check
//          }) // end responseForEach
//        })  // END API REQUEST
//       })(i);  // end j
//      }  // end For-loop    
// }, null, true, 'America/Los_Angeles');   //end cron-job


app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use('/css',express.static(path.join(__dirname, '../client/css')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

// app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/forecast', routes.forecast);
app.use('/api/log', routes.log);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening on port 3000");
});