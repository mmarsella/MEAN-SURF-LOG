require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');



router.get('/retrieve', function(req,res){
  console.log("INSIDE FORECAST!");
  request.get("http://magicseaweed.com/api/"+process.env.MSW_KEY+"/forecast/?spot_id=255", function(err,resp,body){
    var response = JSON.parse(body);

    response.forEach(function(el){
      var forecast = new db.Forecast(el);
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

