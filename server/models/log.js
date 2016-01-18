var mongoose = require("mongoose");
var User = require("./user");

var logSchema = new mongoose.Schema({
  date:Date,
  time:String,
  location:String,
  duration:Number,
  rating:Number,
  description:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  /***** FORECAST DATA FROM THE DB ******/
   
  // REF / EMBED FORECAST DATA HERE  --> SUNDAY


});

/******** EXPORTS *********/

var Log = mongoose.model("Log", logSchema);
module.exports = Log;