const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeaTypeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brewTime: {
    type: Number,
    required: true
  }
});

module.exports = TeaType = mongoose.model("teaTypes", TeaTypeSchema);
