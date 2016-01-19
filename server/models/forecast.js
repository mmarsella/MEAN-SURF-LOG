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
  spot_id: String,
  spot_name: String,
  localTimestamp: Number,
  date: Date,
  year: String,
  hour: String,
  numDate: String,
  numMonth: String,
  time: String,
  fadedRating: Number,
  solidRating: Number,
  minBreakingHeight: Number,  // Use this for text display.
  absMinBreakingHeight: Number, // Use this for smooth graphing.
  maxBreakingHeight: Number, // Use this for text display.
  absMaxBreakingHeight: Number, // Use this for smooth graphing.
  wind: {
    speed: Number,
    direction: Number,
    compassDirection: String,
    chill: Number,
    gusts: Number,
    unit: String
  },
  condition: {
    pressure: Number,
    temperature: Number,
    weather: Number,
    unitPressure: String,
    unit: String
  },
  charts: {
    swell: String,
    period: String,
    wind: String,
    pressure: String,
    sst: String
  }
});
/********* EXPORTS *********/

var Forecast = mongoose.model("Forecast", forecastSchema);
module.exports = Forecast;