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
  localTimestamp: Number,
  fadedRating: Number,
  solidRating: Number,
  absMinBreakingHeight: Number,
  absMaxBreakingHeight: Number,
  wind: {
    speed, String,
    direction: String,
    compassDirection: String,
    chill: String,
    gusts: String
  },
  condition: {
    pressure: String,
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