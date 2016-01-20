var mongoose = require("mongoose");
var User = require("./user");
var Forecast = require("./forecast");

var logSchema = new mongoose.Schema({
  date:Date,
  time:String,
  hour: String,    // from date.getHours()
  minutes: String,
  numDate: String, // from date.numDate()
  numMonth: String, // from date.getMOnth()

  spot_id: String,
  spot_name: String,
  duration:Number,
  rating:Number,
  description:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  forecast: Object,
  /***** FORECAST DATA FROM THE DB ******/
});

/******** EXPORTS *********/

var Log = mongoose.model("Log", logSchema);
module.exports = Log;