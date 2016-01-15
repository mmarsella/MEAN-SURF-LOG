require('dotenv').load();  // for env variables


var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models/');
var jwt = require('jsonwebtoken');
var moment = require('moment');


//GET ALL LOGS
router.get('/', function(req,res){
  db.Log.find({}, function (err,logs){
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




//Create a log


//Delete a log