const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.computer = require("./computer.model.js")(mongoose);
db.employee = require("./employee.model")(mongoose);

module.exports = db;
