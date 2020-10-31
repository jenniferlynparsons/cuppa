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
    required: false
  },
  globalID: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  brewTime: {
    type: Number,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
});

module.exports = TeaType = mongoose.model("teaTypes", TeaTypeSchema);
