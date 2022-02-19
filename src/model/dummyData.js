var mongoose = require("mongoose");
const { Schema } = mongoose;

const dummyData = Schema({
	firstname: String,
	lastname: String,
	phonenumber: String,
	city: String,
});

module.exports = mongoose.model("dummyData", dummyData);