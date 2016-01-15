var mongoose = require("mongoose");
var User = require("./user");

var logSchema = new mongoose.Schema({
  date:Date,
  time:String,
  duration:Number,
  rating:Number,
  description:String,
  location:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  /***** FORECAST DATA FROM THE DB ******/
    size_ft:Number,
    shape:String,
    forecast_time:String,
});

/******** EXPORTS *********/

var Log = mongoose.model("Log", logSchema);
module.exports = Log;