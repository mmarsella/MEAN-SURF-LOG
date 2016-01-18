require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var async = require('async');



/***
Pulled at SUN at 12AM

Ranges from:
Sat Jan 16 2016 16:00:00 GMT-0800 (PST)
-
Thu Jan 21 2016 13:00:00 GMT-0800 (PST)
-- response length is an array of 40 objects

NEED TO TURN INTO A BACKGROUND JOB!

// To associate log w/ forecast

d.getHours()
1
d.getDay()
2
d.getYear()
116

Create a date obj "time" in logs... needs to be a UNIX timestamp
****/
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

router.get('/retrieve', function(req,res){

  // iter. thru all spots and create a forecast

  
    for(var i=0; i < spot_ids.length; i++){
      // close function (j) so I can immediately invoke it afterwards with i. Great example of scope and closure.
      (function(j){
          request.get("http://magicseaweed.com/api/"+process.env.MSW_KEY+"/forecast/?spot_id=" + spot_ids[j], function(err,resp,body){
            var response = JSON.parse(body);
            console.log("Doing forecast... ");
            response.forEach(function(el){
              var forecast = new db.Forecast(el);
              forecast.spot_id = parseInt(spot_ids[j]);
              forecast.spot_name = spotName(spot_ids[j]);
              forecast.date = new Date(el.localTimestamp * 1000);
              forecast.save(function(err){
                if(err){
                  console.log("ERROR IN SAVING!",err);
                }else{
                  console.log("Succesfully SAVED");
                }
              });
              console.log("SAVED");
            });
          })  // END API REQUEST
         })(i);  // end j
        }  // end For-loop    
    console.log("FINISHED!\n\n\n\n")

    res.send("COMPLETE IN FORECAST");

 


      // res.format({
      //   'application/json': function(){
      //     console.log("Sending back the forecast");
      //     res.send("FORECAST COMPLETE");
      //   },
      //   'default': function(){
      //     // log the request and respond with 406
      //     console.log("NOPE");
      //     res.status(406).send('Not Acceptable');
      //   }
      // })    



  
}); // end retrieve

module.exports = router;

