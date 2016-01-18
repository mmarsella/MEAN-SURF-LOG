require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');


//GET ALL LOGS
router.get('/', function(req,res){
  console.log("the body",req.body);
  console.log("INSIDE GET ALL LOGS!");
  db.Log.find({}, function (err,logs){
    console.log("LOGS:",logs)
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


//CREATE LOG
router.post("/", function (req,res){
  console.log("INSIDE CREATE LOG!");
  // req.body is the "log" passed from the LogService in services
  db.Log.create(req.body, function (err,log){
    console.log("THE LOG",log);
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
