/**************** FORECAST  ******************************* 

Every day at 12AM, a background job will make an API call to retrieve
all of the Bay Area/NorCal spot's forecast data and persist
in the db.

The Forecast data will be retrieved when a user makes a new log.

The forecast info will be used to create user-logs.

***********************************************************/

var mongoose = require("mongoose");

/****** FORECAST SCHEMA *******/

var forecastSchema = new mongoose.Schema({
  spot_name:String, // "South Ocean Beach"
  date:String,   // ex "2015-9-30 13"
  hour:String,   //ex 9AM
  size_ft:Number,  //ex 1.6757142548640278
  shape:String,  //"pf"
  tide:String,   //"Poor-fair"

  wind_speed:Number, // http://api.spitcast.com/api/county/wind/san-francisco/?dcat=week
  direction_degrees:Number,
  direction_text:String,
  // time:String,
  // location:{
  //   latitude: Number,
  //   longitude: Number
  // }
});


/********* EXPORTS *********/

var Forecast = mongoose.model("Forecast", forecastSchema);
module.exports = Forecast;