var express = require("express");
var router = express.Router();
var db = require('../models/');
var tokenLib = require("../lib/token");
var token;


router.get('/', function(req,res){
  res.send("nice!");
});

router.post('/signup',function(req,res){
  console.log("INSIDE SIGNUP SERVER!");
  db.User.create(req.body, function(err,user){
    if(err)
      return res.status(400).send("Username/Password can't be blank and Username must be unique");
    var listedItems = {id: user._id, username: user.username};
    token = tokenLib.sign(user._id);
    res.json({token:token, user:listedItems});
  });
});

router.post('/login',function(req,res){
  //what is authenticate?  a mongoose method?
  db.User.authenticate(req.body, function(err,user){
    if(err) return res.status(400).send(err);
    if (!user) return res.status(400).send({error: "Username/password invalid"});
    var listedItems = {id: user._id, username: user.username};
    token = tokenLib.sign(user._id);
    res.json({token:token, user:listedItems});
  });
});


module.exports = router;