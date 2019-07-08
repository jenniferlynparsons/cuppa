const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeaTypeSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = TeaType = mongoose.model("teaTypes", TeaTypeSchema);
