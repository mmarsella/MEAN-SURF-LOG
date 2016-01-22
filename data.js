#!/usr/bin/env node 

var request = require("request");
var db = require('./server/models/');
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
             303: "Virgin Creek"
              };

var spot_ids = Object.keys(spots);

function spotName(spot_id){
    return spots[spot_id] || "Not a spot!";
}




var d = new Date(); 
console.log("The time is...",d); 
  // iter. thru all spots and create a forecast
  for(var i=0; i < spot_ids.length; i++){
    // close function (j) so I can immediately invoke it afterwards with i. Great example of scope and closure.
    (function(j){
      request.get("http://magicseaweed.com/api/"+process.env.MSW_KEY+"/forecast/?spot_id=" + spot_ids[j], function(err,resp,body){
          
          var response = JSON.parse(body);
          console.log("Doing forecast... ");
          
          response.forEach(function(el){
            var d = new Date(el.timestamp * 1000);

            // db.Forecast.findOrCreate
            // If same spot, date and time{  skip storing it into the database!  }
            // eval(locus)
            db.Forecast.findOne({spot_id:spot_ids[j], localTimestamp: el.localTimestamp, numDate: d.getDate()}, function(err, found){
              console.log("INSIDE FIND ONE!", found);
              if(!found){
                  console.log("EL", el);
                  var forecast = new db.Forecast(el);
                  console.log("D",d);
                  forecast.year = d.getYear();
                  forecast.hour = d.getHours();
                  forecast.numDate = d.getDate();
                  forecast.numMonth = d.getMonth();
                  forecast.spot_id = spot_ids[j];
                  forecast.spot_name = spotName(spot_ids[j]);
                  forecast.date = new Date(el.timestamp * 1000);
                  forecast.save(function(err){
                  if(err){
                    console.log("ERROR IN SAVING!",err);
                  }else{
                    console.log("Succesfully SAVED");
                  }
                }); //end Save
                console.log("SAVED");
            }else{
              console.log("IN THE DB!!!  SKIPPED!")
            }
           }); //end findOne check
         }) // end responseForEach
       })  // END API REQUEST
      })(i);  // end j
     }  // end For-loop    



//This is for local CRON JOBS
// var CronJob = require('cron').CronJob;
// new CronJob('0 */1 * * * *', function() {  // }, null, true, 'America/Los_Angeles');   //end cron-job
