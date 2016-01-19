require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var user;

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

//GET ALL LOGS
router.post('/getLogs', function(req,res){
  console.log("THE BODY IN LOG.JS\n\n",req.body);
  if(req.body._id){
    user = req.body._id;
  }else{
    user = req.body.user;
  }

//Find logs by user id
  db.Log.find({user:user}, function (err,logs){
    console.log("LOGS from USER:",logs)
    if(err){
      console.log(err);
    }
    res.format({
      'application/json': function(){
        res.send(logs);  //sending back 11am forecast
      },
      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

// CAN"T FOLLOW RESTFUL routing due to having to pass 
// user in for the first route --> '/'.

 // var foreCastHours = [1,4,7,10,13,16,19,22];

function closestHour(logHour){
 
 if(logHour <= 1 || logHour <= 2){
  return 1;
 }else if(logHour <= 4 || logHour <= 5){
  return 4;
 }else if(logHour <= 7 || logHour <= 8){
  return 7;
 }else if(logHour <= 10 || logHour <= 11){
  return 10;
 }else if(logHour <= 13 || logHour <= 14){
  return 13;
 }else if(logHour <= 16 || logHour <= 17){
  return 16;
 }else if(logHour <= 19 || logHour <= 20){
  return 19;
 }else{
  return 22;
 }
}



//CREATE LOG
router.post("/", function (req,res){
  console.log("REQ.BODY",req.body);
  if(req.body._id){
    user = req.body._id;
  }else{
    user = req.body.user;
  }
  // req.body is the "log" passed from the LogService in services
  db.Log.create(req.body, function (err,log){

    console.log("LOG TIME", log.time);
    console.log("TIME TYPE", typeof log.time);
    console.log("String?", log.time.toString());
    console.log("LOG PARSED", log.time.split("-"));

    var dateString = log.time.split("-")[2];

    var time = new Date(req.body.time);
    var d = new Date(req.body.date);
    var month = d.getMonth();
    console.log("MONTH", month);
    
    var date = d.getDate();
    console.log("D before crash", d);
    var hour = time.toString().split(" ")[4].split(":")[0];
    console.log("D",d);
    log.user = req.body.user;
    log.numDate = date;
    log.numMonth = month;
    log.hour = hour
    log.spot_name = spotName(req.body.spot_id);
    console.log("REQ.BODY!",req.body);
    console.log("THE LOG",log); 


   /* ----- FIND FORECAST FOR THIS DB ---------------*/ 

    // Find forecast based on closest hour, date and spot
    db.Forecast.find({spot_id:log.spot_id,numDate:log.numDate,hour:closestHour(log.hour)}, function(err,forecast){
      console.log("INSIDE FORECAST FIND FOR LOG...", forecast);
      if(err){
        console.log("Error with forecast find:",err);
      }else{
        log.forecast = forecast._id;
        log.save();
      }
    });


    /* This may need to be wrapped in a callback  or a .then....


    /* -------------------------------------------------------------*/





    if(err){
      console.log(err);
      res.status(404).send("ERROR!");
    }else{ 
      res.send(log);
    }
  })
});

//Delete a log

module.exports = router;
