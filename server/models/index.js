var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/surfLog");
mongoose.set("debug",true);

module.exports.User = require("./user");
module.exports.Log = require("./log");
module.exports.Forecast = require("./forecast");