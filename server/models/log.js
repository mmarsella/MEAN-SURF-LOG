var mongoose = require("mongoose");
var User = require("./user");

var logSchema = new mongoose.Schema({
  date:Date,
  time:String,
  spot_id: String,
  spot_name: String,
  duration:Number,
  rating:Number,
  description:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  forecast:{
    type:mongoose.Schema.Types.ObjectId
  }
  /***** FORECAST DATA FROM THE DB ******/
});

/******** EXPORTS *********/

var Log = mongoose.model("Log", logSchema);
module.exports = Log;