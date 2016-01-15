var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');


router.get('/retrieve', function(req,res){
  console.log("INSIDE FORECAST!");
  request.get("http://magicseaweed.com/api/f5e9d01ddf1135ef003bc9ebf35aed62/forecast/?spot_id=255", function(err,resp,body){
    var forecast = JSON.parse(body);
    console.log("THE FORECAST\n\n\n\n",forecast[0]);
    res.format({
      'application/json': function(){
        console.log("Sending back the forecast");
        res.send(forecast[0]);
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

