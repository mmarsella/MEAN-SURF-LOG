require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var user;

//GET ALL LOGS
router.post('/', function(req,res){
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

//CREATE LOG
router.post("/create", function (req,res){
  if(req.body._id){
    user = req.body._id;
  }else{
    user = req.body.user;
  }
  // req.body is the "log" passed from the LogService in services
  db.Log.create(req.body, function (err,log){
    log.user = req.body.user;
    console.log("REQ.BODY!",req.body);
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
