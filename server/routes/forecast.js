require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');



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

router.get('/retrieve', function(req,res){
  console.log("INSIDE FORECAST!");
  request.get("http://magicseaweed.com/api/"+process.env.MSW_KEY+"/forecast/?spot_id=255", function(err,resp,body){
    var response = JSON.parse(body);

    response.forEach(function(el){
      var forecast = new db.Forecast(el);
      forecast.date = new Date(el.localTimestamp * 1000);
      forecast.save();
    });


    console.log("THE FORECAST\n\n\n\n",response.length);
    res.format({
      'application/json': function(){
        console.log("Sending back the forecast");
        res.send(response[0]);
      },
      'default': function(){
        // log the request and respond with 406
        console.log("NOPE");
        res.status(406).send('Not Acceptable');
      }
    })
  })
});

module.exports = router;

